'use client';
import { PaginationWithLinks } from '@/components/ui/pagination-with-links';
import type { Template } from '@prisma/client';
import Image from 'next/image';
import { useState } from 'react';
import TemplatePreviewDialog from './TemplatePreviewDialog';

type Props = {
  currentPage: number;
  pageSize: number;
  resultsCount: number;
  challengeTemplates: Template[];
};
export default function MainTemplatesContent({
  currentPage,
  pageSize,
  resultsCount,
  challengeTemplates,
}: Props) {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  );
  return (
    <>
      {selectedTemplate && (
        <TemplatePreviewDialog
          template={selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
        />
      )}
      <div>
        <div className="flex flex-wrap gap-4 justify-center">
          {challengeTemplates.map((template) => (
            <button
              key={`template-${template.id}`}
              className="flex flex-col items-center hover:cursor-pointer hover:opacity-60 transition-all"
              onClick={() => setSelectedTemplate(template)}
            >
              <Image
                src={`/challenge_templates/${template.image}`}
                alt={template.imageAlt}
                width="268"
                height="179"
                className="rounded-[5px]"
              />
              <p className="text-sm font-semibold">{template.title}</p>
            </button>
          ))}
        </div>
      </div>
      {challengeTemplates.length > 0 ? (
        <div className="w-full">
          <div className="mt-4">
            <PaginationWithLinks
              page={currentPage}
              totalCount={resultsCount}
              pageSize={pageSize}
              pageSizeSelectOptions={{
                pageSizeOptions: [3, 6, 12, 15, 18],
              }}
            />
          </div>
        </div>
      ) : (
        <div>No challenge templates found</div>
      )}
    </>
  );
}
