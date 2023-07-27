import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const PromptCard = ({
  handleDelete,
  handleEdit,
  post,
  handleTagClick,
}) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-center items-start gap-5">
        <Link
          href={`/user/${post?.creator._id}`}
          className="flex-1 flex items-center justify-start gap-3 cursor-pointer"
        >
          <Image
            src={post?.creator.image}
            width={40}
            height={40}
            alt="profile"
            className=" rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className=" font-satoshi font-semibold text-gray-900">
              {post?.creator.username}
            </h3>
            <p className=" font-inter text-sm text-gray-500">
              {post?.creator.email}
            </p>
          </div>
        </Link>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post?.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="copy"
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="font-satoshi my-4 text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter cursor-pointer text-sm blue_gradient"
        onClick={() => {
          handleTagClick && handleTagClick(post.tag);
        }}
      >
        #{post.tag}
      </p>

      {session?.user.id === post?.creator._id && pathName === "/profile" && (
        <div className="flex-center border-t pt-3 border-gray-100 gap-4 mt-5">
          <p
            onClick={handleEdit}
            className="font-inter text-sm cursor-pointer green_gradient"
          >
            Edit
          </p>
          <p
            onClick={handleDelete}
            className="font-inter text-sm cursor-pointer orange_gradient"
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};
