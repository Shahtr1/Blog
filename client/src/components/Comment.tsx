import { useEffect, useState } from "react";
import { IComment } from "../models/comment.model";
import { IUser } from "../models/user.model";
import moment from "moment";

export default function Comment({ comment }: { comment: IComment }) {
  const [user, setUser] = useState<IUser | undefined>(undefined);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (error: any) {
        console.error(error.message);
      }
    };
    getUser();
  }, [comment]);
  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-200"
          src={user?.profilePicture}
          alt={user?.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-gray-500 text-sm">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className="text-gray-500 dark:text-gray-300 pb-2">
          {comment.content}
        </p>
      </div>
    </div>
  );
}
