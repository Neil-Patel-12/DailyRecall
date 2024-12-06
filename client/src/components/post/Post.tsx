// Post.tsx

import { ReactNode } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";

export interface PostSmProps {
  id: number;
  title: string;
  authorId: number;
  firstName: string;
  lastName: string;
  confidence: number;
  subject: "Math" | "Science" | "History" | "Art" | "Misc";
}

const PostSm = ({ post }: { post: PostSmProps }) => {
  return (
    <Button className="min-w-[250px] max-w-[250px] min-h-[280px] max-h-[280px] hover:bg-accent active:brightness-100 p-0 my-4">
      <div className="flex relative shadow-md overflow-hidden transition duration-100 ease-in w-full h-full bg-[#ffb763] hover:bg-[#ffb763] hover:brightness-110 active:brightness-125 hover:-translate-x-2 hover:-translate-y-2">
        <div className="ml-auto">
          <h1 className="mt-2 mx-3 text-2xl font-extrabold text-ellipsis text-wrap text-right text-blue-900">
            {post.title}
          </h1>
          <h2 className="text-right mx-3 mt-3 text-md italic text-blue-900 font-semibold">
            {`${post.firstName} ${post.lastName}`}
          </h2>
          <h2 className="text-4xl font-bold opacity-15 absolute translate-y-12 -translate-x-12 text-blue-900">
            {post.subject}
          </h2>
        </div>
        <div
          className={`${getColor(
            post.confidence,
          )} flex absolute justify-center items-center translate-x-[110%] translate-y-5 rounded-full w-[8rem] h-[8rem] opacity-80 brightness-[75%] shadow-md self-end justify-self-end`}
        >
          <h1 className="top text-3xl font-bold text-blue-900">
            {post.confidence}
          </h1>
        </div>
      </div>
    </Button>
  );
};

const PostLg = ({ children }: { children: ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
    </Dialog>
  );
};

const getColor = (confidence: number) => {
  const clampedValue = Math.min(10, Math.max(1, confidence));

  const confidenceColors = [
    "bg-[#ff6363]", // 1
    "bg-[#ff8263]", // 2
    "bg-[#ff9a63]", // 3
    "bg-[#ffa463]", // 4
    "bg-[#ffb963]", // 5
    "bg-[#ffd863]", // 6
    "bg-[#ffed63]", // 7
    "bg-[#f7ff63]", // 8
    "bg-[#ceff63]", // 9
    "bg-[#73ff63]", // 10
  ];

  return confidenceColors[clampedValue - 1];
};

export { PostSm, PostLg };
