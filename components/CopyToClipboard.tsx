"use client";

import { useState } from "react";
import Copy from "@/public/icons/copy.svg";
import FileTimes from "@/public/icons/file-times.svg";
import FileCheck from "@/public/icons/file-check.svg";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type Props = {
  text: string;
};

export default function CopyToClipboard({ text }: Props) {
  const initialIcon = <Copy />;

  const [icon, setIcon] = useState(initialIcon);
  const [loading, setLoading] = useState(false);

  const copyToClipboard = async () => {
    try {
      setLoading(true);
      await navigator.clipboard.writeText(text);
      setIcon(<FileCheck />);
      toast.success("Copied to clipboard!");
    } catch (error) {
      setIcon(<FileTimes />);
      toast.error("Failed to copy to clipboard!");
    } finally {
      setTimeout(() => {
        setIcon(initialIcon);
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button disabled={loading} className="flex" onClick={copyToClipboard}>
            <i className="size-6">{icon}</i>
          </button>
        </TooltipTrigger>
        <TooltipContent>Copy to clipboard</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}