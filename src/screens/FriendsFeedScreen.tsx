import { useState, useEffect } from "react";
import { Heart, MessageCircle, Share2, Users, UserPlus } from "lucide-react";
import { mockPosts, mockFriends, Post, Friend } from "../data/mockData";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

interface FriendsFeedScreenProps {
  onSelectRestaurant: (restaurantId: string) => void;
  onAddPost: () => void;
}

export function FriendsFeedScreen({
  onSelectRestaurant,
  onAddPost,
}: FriendsFeedScreenProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  useEffect(() => {
    // Load posts from localStorage or use mock data
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      const parsedPosts = JSON.parse(storedPosts);
      // Convert timestamp strings back to Date objects
      const postsWithDates = parsedPosts.map((p: any) => ({
        ...p,
        timestamp: new Date(p.timestamp),
      }));
      setPosts(postsWithDates);
    } else {
      setPosts(mockPosts);
    }

    setFriends(mockFriends);

    // Load liked posts
    const storedLikes = localStorage.getItem("likedPosts");
    if (storedLikes) {
      setLikedPosts(JSON.parse(storedLikes));
    }
  }, []);

  const toggleLike = (postId: string) => {
    const newLikedPosts = likedPosts.includes(postId)
      ? likedPosts.filter((id) => id !== postId)
      : [...likedPosts, postId];

    setLikedPosts(newLikedPosts);
    localStorage.setItem("likedPosts", JSON.stringify(newLikedPosts));

    // Update post likes count
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: likedPosts.includes(postId)
                ? post.likes - 1
                : post.likes + 1,
            }
          : post
      )
    );
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `vor ${days}d`;
    if (hours > 0) return `vor ${hours}h`;
    return "gerade eben";
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-6 pb-4 border-b border-border">
        <h1 className="mb-1">Freunde Feed</h1>
        <p className="text-muted-foreground">
          Entdecke, wo deine Freunde essen
        </p>
      </div>

      {/* Friends List */}
      <div className="px-4 py-4 border-b border-border overflow-x-auto">
        <div className="flex gap-3 pb-2">
          {/* Add Friend Button */}
          <button className="flex flex-col items-center gap-2 flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-muted-foreground/30">
              <UserPlus className="h-6 w-6 text-muted-foreground" />
            </div>
            <span className="text-xs text-muted-foreground">Hinzufügen</span>
          </button>

          {/* Friends */}
          {friends.map((friend) => (
            <button
              key={friend.id}
              className="flex flex-col items-center gap-2 flex-shrink-0"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs max-w-[64px] truncate">
                {friend.name.split(" ")[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Posts Feed */}
      <div className="flex-1 overflow-auto pb-20">
        {posts.length > 0 ? (
          <div className="divide-y divide-border">
            {posts.map((post) => (
              <div key={post.id} className="p-4">
                {/* Post Header */}
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={post.userAvatar}
                    alt={post.userName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <p>{post.userName}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatTimestamp(post.timestamp)}
                    </p>
                  </div>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                    <Users className="h-3 w-3 mr-1" />
                    Follow
                  </Badge>
                </div>

                {/* Post Content */}
                <p className="mb-3">{post.content}</p>

                {/* Restaurant Tag */}
                <button
                  onClick={() => onSelectRestaurant(post.restaurantId)}
                  className="mb-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  <span className="text-sm">📍 {post.restaurantName}</span>
                </button>

                {/* Post Image */}
                {post.image && (
                  <div className="mb-3 rounded-xl overflow-hidden">
                    <img
                      src={post.image}
                      alt="Post"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                )}

                {/* Post Actions */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className="flex items-center gap-1.5 hover:text-primary transition-colors"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        likedPosts.includes(post.id)
                          ? "fill-primary text-primary"
                          : ""
                      }`}
                    />
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                    <MessageCircle className="h-5 w-5" />
                    <span className="text-sm">Kommentar</span>
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-primary transition-colors ml-auto">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full px-4 text-center">
            <Users className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="mb-2">Noch keine Beiträge</h3>
            <p className="text-muted-foreground mb-4">
              Folge Freunden, um ihre Restaurant-Empfehlungen zu sehen
            </p>
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={onAddPost}
        className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
      >
        <span className="text-2xl">+</span>
      </button>
    </div>
  );
}
