import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface PreviewProps {
  previewOpen: boolean;
  setPreviewOpen: React.Dispatch<React.SetStateAction<boolean>>;
  previewPhoto: string;
}

const PhotoPreview = ({
  previewOpen,
  setPreviewOpen,
  previewPhoto,
}: PreviewProps) => {
  return (
    <Transition.Root show={previewOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setPreviewOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-80 backdrop-blur transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center p-4 text-center sm:p-0 lg:items-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="flex w-full flex-col-reverse justify-center sm:landscape:my-auto sm:landscape:flex-row sm:landscape:items-start md:min-w-[975px] md:flex-row">
                <div className="relative flex h-72 w-full transform overflow-hidden rounded-lg bg-amber-50 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:p-6 sm:landscape:max-w-sm md:md:h-[700px] md:max-w-4xl">
                  <Image
                    fill
                    src={previewPhoto}
                    alt="Preview Photo"
                    className="rounded-lg object-cover"
                  />
                </div>
                <div>
                  <button
                    type="button"
                    className="mt-2 flex w-full items-center justify-end px-4 pt-5 pb-4"
                    onClick={() => setPreviewOpen(false)}
                  >
                    <XMarkIcon
                      className="block h-8 w-8 text-white transition-colors hover:text-amber-500 lg:h-12 lg:w-12"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default PhotoPreview;
