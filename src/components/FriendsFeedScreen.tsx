import { Post, User, Restaurant } from '../data/mockData';
import { PostCard } from './PostCard';
import { Users } from 'lucide-react';

interface FriendsFeedScreenProps {
  posts: Post[];
  users: User[];
  restaurants: Restaurant[];
}

export function FriendsFeedScreen({ posts, users, restaurants }: FriendsFeedScreenProps) {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6 text-[#FF8C42]" />
          <div>
            <h2 className="text-xl">Friends Feed</h2>
            <p className="text-sm text-muted-foreground">Sieh, wo deine Freunde gegessen haben</p>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">Noch keine Beiträge von Freunden</p>
            <p className="text-sm text-muted-foreground mt-2">Füge Freunde hinzu, um ihre Beiträge zu sehen</p>
          </div>
        ) : (
          posts.map((post) => {
            const user = users.find(u => u.id === post.userId);
            const restaurant = restaurants.find(r => r.id === post.restaurantId);
            
            if (!user || !restaurant) return null;
            
            return (
              <PostCard
                key={post.id}
                post={post}
                user={user}
                restaurant={restaurant}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
