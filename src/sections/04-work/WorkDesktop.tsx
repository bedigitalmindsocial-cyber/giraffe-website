'use client';

import { useState } from 'react';
import { Modal } from '@/components/Modal';
import { ImagePlaceholder } from '@/components/ImagePlaceholder';
import { WindowsFolderIcon } from '@/components/WindowsFolderIcon';
import type { WorkFolder, WorkSample } from '@/lib/types';

type WorkDesktopProps = {
  folders: WorkFolder[];
  samples: WorkSample[];
};

export function WorkDesktop({ folders, samples }: WorkDesktopProps) {
  const [openFolderSlug, setOpenFolderSlug] = useState<string | null>(null);
  const openFolder = folders.find((f) => f.slug === openFolderSlug) ?? null;
  const folderSamples = openFolder
    ? samples
        .filter((s) => s.parentFolderSlug === openFolder.slug)
        .sort((a, b) => a.position - b.position)
    : [];

  return (
    <>
      <ul
        className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 md:gap-y-12"
        aria-label="Work folders"
      >
        {folders.map((folder) => (
          <li key={folder.slug} className="text-center">
            <button
              type="button"
              onClick={() => setOpenFolderSlug(folder.slug)}
              className="group inline-flex flex-col items-center gap-3 px-4 py-3 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-purple focus-visible:outline-offset-2"
              aria-label={`Open folder: ${folder.name}`}
            >
              <span className="block w-24 md:w-28 transition-transform duration-200 ease-out-quart group-hover:-translate-y-0.5 group-active:translate-y-0">
                <WindowsFolderIcon />
              </span>
              <span className="font-mono text-[13px] text-ink uppercase tracking-wider">
                {folder.name}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {openFolder && (
        <Modal
          open
          onClose={() => setOpenFolderSlug(null)}
          labelledBy={`folder-title-${openFolder.slug}`}
          variant="window"
          innerClassName="w-[92vw] max-w-[1600px] h-[88vh]"
        >
          <div className="flex items-center justify-between bg-deep-purple text-paper px-3 py-2 select-none">
            <h3
              id={`folder-title-${openFolder.slug}`}
              className="font-sans font-medium text-[16px]"
            >
              {openFolder.name}
            </h3>
            <button
              type="button"
              onClick={() => setOpenFolderSlug(null)}
              aria-label="Close folder"
              className="w-5 h-5 bg-mid-purple-2 hover:bg-paper border border-mid-purple-1 inline-flex items-center justify-center text-ink text-[11px] font-mono"
            >
              X
            </button>
          </div>

          <div className="bg-paper p-6 md:p-10 flex-1 overflow-y-auto">
            {folderSamples.length === 0 ? (
              <div className="font-mono text-[13px] text-ink space-y-4">
                <p>This folder is being filled in as projects close. Check back soon.</p>
                <p className="text-mid-purple-1">
                  {openFolder.seedDescription}
                </p>
              </div>
            ) : (
              <ul className="space-y-10">
                {folderSamples.map((sample) => (
                  <li key={sample.id} className="text-center">
                    {sample.imageUrl ? (
                      <figure
                        className="mx-auto max-w-full text-left"
                        style={{ display: 'table' }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={sample.imageUrl}
                          alt={sample.imageAlt}
                          loading="lazy"
                          className="block max-w-full max-h-[72vh] w-auto h-auto"
                        />
                        <figcaption
                          className="font-sans text-[15px] text-ink pt-4"
                          style={{
                            display: 'table-caption',
                            captionSide: 'bottom',
                          }}
                        >
                          {sample.caption}
                        </figcaption>
                      </figure>
                    ) : (
                      <div className="text-left">
                        <ImagePlaceholder
                          alt={sample.imageAlt}
                          ratio="3:2"
                          tone="mid-purple-3"
                        />
                        <p className="font-sans text-[15px] text-ink mt-4">
                          {sample.caption}
                        </p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}
