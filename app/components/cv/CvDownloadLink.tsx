import { CV_DOWNLOAD_FILENAME, CV_PATH } from "@/lib/cv";

const BUTTON_CLASSES =
  "rounded border border-border px-5 py-3 text-sm font-medium";

interface CvDownloadLinkProps {
  className?: string;
}

export default function CvDownloadLink({ className }: CvDownloadLinkProps) {
  return (
    <a
      href={CV_PATH}
      download={CV_DOWNLOAD_FILENAME}
      className={className ? `${BUTTON_CLASSES} ${className}` : BUTTON_CLASSES}
    >
      Download CV
    </a>
  );
}
