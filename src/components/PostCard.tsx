import { Post, User, Restaurant } from '../data/mockData';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { Card } from './ui/card';

interface PostCardProps {
  post: Post;
  user: User;
  restaurant: Restaurant;
}

export function PostCard({ post, user, restaurant }: PostCardProps) {
  const timeAgo = (timestamp: string) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffMs = now.getTime() - postTime.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Gerade eben';
    if (diffHours < 24) return `vor ${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Gestern';
    return `vor ${diffDays} Tagen`;
  };

  return (
    <Card className="overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-[#FF8C42] rounded-full flex items-center justify-center text-xl">
          {user.avatar}
        </div>
        <div className="flex-1">
          <p className="font-medium">{user.name}</p>
          <p className="text-xs text-muted-foreground">war bei {restaurant.name} • {timeAgo(post.timestamp)}</p>
        </div>
      </div>

      {/* Image */}
      {post.image && (
        <img 
          src={post.image} 
          alt="Post"
          className="w-full h-64 object-cover"
        />
      )}

      {/* Content */}
      <div className="p-4">
        <p className="mb-3">{post.content}</p>

        {/* Actions */}
        <div className="flex items-center gap-6 text-muted-foreground">
          <button className="flex items-center gap-2 hover:text-[#FF8C42] transition-colors">
            <Heart className="w-5 h-5" />
            <span className="text-sm">{post.likes}</span>
          </button>
          <button className="flex items-center gap-2 hover:text-[#FF8C42] transition-colors">
            <MessageCircle className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 hover:text-[#FF8C42] transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Card>
  );
}
