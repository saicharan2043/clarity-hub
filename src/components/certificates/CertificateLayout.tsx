import { CertificateContent } from '@/types/certificate';

interface CertificateLayoutProps {
  content: CertificateContent;
  courseName: string;
  isEditing?: boolean;
  onContentChange?: (field: keyof CertificateContent, value: string) => void;
}

export const CertificateLayout = ({
  content,
  courseName,
  isEditing = false,
  onContentChange,
}: CertificateLayoutProps) => {
  const handleChange = (field: keyof CertificateContent) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onContentChange?.(field, e.target.value);
  };

  const EditableField = ({
    field,
    value,
    className,
    multiline = false,
  }: {
    field: keyof CertificateContent;
    value: string;
    className?: string;
    multiline?: boolean;
  }) => {
    if (!isEditing) {
      return <span className={className}>{value}</span>;
    }

    if (multiline) {
      return (
        <textarea
          value={value}
          onChange={handleChange(field)}
          className={`${className} bg-transparent border-b-2 border-dashed border-primary/50 focus:border-primary outline-none resize-none text-center w-full`}
          rows={2}
        />
      );
    }

    return (
      <input
        type="text"
        value={value}
        onChange={handleChange(field)}
        className={`${className} bg-transparent border-b-2 border-dashed border-primary/50 focus:border-primary outline-none text-center w-full`}
      />
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-2xl aspect-[1.414/1] relative overflow-hidden">
      {/* Decorative Pattern - Top Left */}
      <div className="absolute top-0 left-0 w-48 h-48">
        <svg viewBox="0 0 200 200" className="w-full h-full opacity-10">
          {Array.from({ length: 20 }).map((_, i) =>
            Array.from({ length: 20 }).map((_, j) => (
              <circle
                key={`${i}-${j}`}
                cx={10 + i * 10}
                cy={10 + j * 10}
                r={Math.max(0, 3 - (i + j) * 0.15)}
                fill="#22c55e"
              />
            ))
          )}
        </svg>
      </div>

      {/* Decorative Pattern - Bottom Left */}
      <div className="absolute bottom-0 left-0 w-48 h-48 rotate-180">
        <svg viewBox="0 0 200 200" className="w-full h-full opacity-10">
          {Array.from({ length: 20 }).map((_, i) =>
            Array.from({ length: 20 }).map((_, j) => (
              <circle
                key={`${i}-${j}`}
                cx={10 + i * 10}
                cy={10 + j * 10}
                r={Math.max(0, 3 - (i + j) * 0.15)}
                fill="#22c55e"
              />
            ))
          )}
        </svg>
      </div>

      {/* Header with Logo */}
      <div className="absolute top-6 right-8 flex items-center gap-3">
        <span className="text-gray-600 text-sm font-medium">Life Is On</span>
        <div className="w-px h-6 bg-gray-300"></div>
        <div className="flex items-center gap-1">
          <span className="text-[#3dcd58] font-bold text-lg">Schneider</span>
          <span className="text-[#3dcd58] text-xs">Electric</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center h-full px-12 py-16">
        {/* Certificate Title */}
        <div className="mb-2">
          <EditableField
            field="title"
            value={content.title}
            className="text-6xl font-script text-[#3dcd58] font-light italic"
          />
        </div>

        {/* Subtitle */}
        <div className="mb-6">
          <EditableField
            field="subtitle"
            value={content.subtitle}
            className="text-gray-600 text-lg"
          />
        </div>

        {/* Candidate Name - Dynamic placeholder */}
        <div className="mb-4">
          <span className="text-[#3dcd58] text-3xl font-bold">Mr. Name Surname</span>
          {isEditing && (
            <span className="block text-xs text-gray-400 text-center mt-1">
              (Auto-filled with user name)
            </span>
          )}
        </div>

        {/* Recognition Text */}
        <div className="mb-4">
          <EditableField
            field="recognitionText"
            value={content.recognitionText}
            className="text-gray-700 text-lg"
          />
        </div>

        {/* Course Name Banner */}
        <div className="w-full bg-[#3dcd58] py-4 px-8 mb-6">
          <h2 className="text-white text-2xl font-bold text-center">
            {courseName || 'Course / Assessment Name'}
          </h2>
          {isEditing && (
            <span className="block text-xs text-white/70 text-center mt-1">
              (Selected from dropdown above)
            </span>
          )}
        </div>

        {/* Description */}
        <div className="max-w-2xl text-center mb-6">
          <EditableField
            field="descriptionText"
            value={content.descriptionText}
            className="text-gray-600 text-sm leading-relaxed"
            multiline
          />
        </div>

        {/* Stats Section - Dynamic placeholders */}
        <div className="flex justify-center gap-16 mb-6">
          <div className="text-center">
            <span className="text-gray-500 text-sm block">Score</span>
            <span className="text-[#3dcd58] text-3xl font-bold">80/100</span>
            {isEditing && (
              <span className="block text-xs text-gray-400">(Auto-filled)</span>
            )}
          </div>
          <div className="text-center">
            <span className="text-gray-500 text-sm block">Result</span>
            <span className="text-[#3dcd58] text-3xl font-bold">Pass</span>
            {isEditing && (
              <span className="block text-xs text-gray-400">(Auto-filled)</span>
            )}
          </div>
          <div className="text-center">
            <span className="text-gray-500 text-sm block">No of Attempts</span>
            <span className="text-[#3dcd58] text-3xl font-bold">2</span>
            {isEditing && (
              <span className="block text-xs text-gray-400">(Auto-filled)</span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="w-full flex justify-between items-end mt-auto">
          <div>
            <EditableField
              field="hashtag"
              value={content.hashtag}
              className="text-[#3dcd58] font-medium"
            />
          </div>
          <div className="text-right text-gray-600 text-sm">
            <div>
              <span className="font-semibold">Date:</span> 27 Nov 2025
              {isEditing && <span className="text-gray-400 text-xs ml-1">(Auto)</span>}
            </div>
            <div>
              <span className="font-semibold">Duration:</span> 1 Hrs 30 Mins
              {isEditing && <span className="text-gray-400 text-xs ml-1">(Auto)</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
