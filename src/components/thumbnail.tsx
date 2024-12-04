/* eslint-disable @next/next/no-img-element */

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";

interface ThumbnailProps {
  url: string | null | undefined;
}

const Thumbnail = ({ url }: ThumbnailProps) => {
  if (!url) {
    return null;
  }

  return (
    <Dialog>
      <DialogTitle className="hidden" />
      <DialogTrigger>
        <div className="relative overflow-hidden max-w-[360px] border rounded-lg my-2 cursor-zoom-in">
          <img
            src={url}
            alt="Message image"
            className="rounded-md object-cover size-full"
          />
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-[800ps] border-none bg-transparent p-0 shadow-none">
        <img
          src={url}
          alt="Message image"
          className="rounded-md object-cover size-full"
        />
      </DialogContent>

    </Dialog>
  );
};
export default Thumbnail;