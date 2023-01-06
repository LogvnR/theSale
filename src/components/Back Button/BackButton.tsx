import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

interface BackButtonProps {
  link: string;
}

const BackButton = ({ link }: BackButtonProps) => {
  return (
    <Link href={link}>
      <button
        type="button"
        className="mb-4 inline-flex items-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-500 shadow-sm hover:bg-blue-200  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <ArrowLeftIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        Back &#x2022; Retorno
      </button>
    </Link>
  );
};

export default BackButton;
