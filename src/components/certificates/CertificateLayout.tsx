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
    <div
      className="w-full mx-auto bg-white shadow-2xl relative overflow-hidden"
      style={{ aspectRatio: '11 / 8.5', containerType: 'inline-size' }}
    >
      {/* Decorative Pattern - Top Left */}
      <div className="absolute top-0 left-0 w-[25%] h-[30%]">
        <svg viewBox="0 0 200 200" preserveAspectRatio="none" className="w-full h-full opacity-10">
          {Array.from({ length: 20 }).map((_, i) =>
            Array.from({ length: 20 }).map((_, j) => (
              <circle
                key={`tl-${i}-${j}`}
                cx={10 + i * 10}
                cy={10 + j * 10}
                r={Math.max(0, 3 - (i + j) * 0.15)}
                fill="#22c55e"
              />
            ))
          )}
        </svg>
      </div>

      {/* Decorative Pattern - Bottom Right */}
      <div className="absolute bottom-0 right-0 w-[25%] h-[30%] rotate-180">
        <svg viewBox="0 0 200 200" preserveAspectRatio="none" className="w-full h-full opacity-10">
          {Array.from({ length: 20 }).map((_, i) =>
            Array.from({ length: 20 }).map((_, j) => (
              <circle
                key={`br-${i}-${j}`}
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
      <div className="absolute top-[3%] right-[3%] flex items-center gap-[0.8cqi]">
        <span className="text-gray-600 text-[1.2cqi] font-medium">Life Is On</span>
        <div className="w-px h-[2cqi] bg-gray-300"></div>
        <div className="flex items-center gap-[0.3cqi]">
          <span className="text-[#3dcd58] font-bold text-[1.6cqi]">Schneider</span>
          <span className="text-[#3dcd58] text-[0.9cqi]">Electric</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center h-full px-[6%] py-[5%]">
        {/* Certificate Title */}
        <div className="mb-[1cqi]">
          <EditableField
            field="title"
            value={content.title}
            className="text-[5cqi] font-script text-[#3dcd58] font-light italic"
          />
        </div>

        {/* Subtitle */}
        <div className="mb-[2cqi]">
          <EditableField
            field="subtitle"
            value={content.subtitle}
            className="text-gray-600 text-[1.6cqi]"
          />
        </div>

        {/* Candidate Name */}
        <div className="mb-[1.5cqi]">
          <span className="text-[#3dcd58] text-[2.8cqi] font-bold">Mr. Name Surname</span>
          {isEditing && (
            <span className="block text-[0.9cqi] text-gray-400 text-center mt-[0.3cqi]">
              (Auto-filled with user name)
            </span>
          )}
        </div>

        {/* Recognition Text */}
        <div className="mb-[1.5cqi]">
          <EditableField
            field="recognitionText"
            value={content.recognitionText}
            className="text-gray-700 text-[1.6cqi]"
          />
        </div>

        {/* Course Name Banner - breaks out of padding to go edge-to-edge */}
        <div
          className="bg-[#3dcd58] py-[1.5cqi] px-[4cqi] mb-[2cqi]"
          style={{ marginLeft: '-6.4%', marginRight: '-6.4%', width: 'calc(100% + 12.8%)' }}
        >
          <h2 className="text-white text-[2.2cqi] font-bold text-center">
            {courseName || 'Course / Assessment Name'}
          </h2>
          {isEditing && (
            <span className="block text-[0.8cqi] text-white/70 text-center mt-[0.3cqi]">
              (Selected from dropdown above)
            </span>
          )}
        </div>

        {/* Description */}
        <div className="max-w-[80%] text-center mb-[2cqi]">
          <EditableField
            field="descriptionText"
            value={content.descriptionText}
            className="text-gray-600 text-[1.1cqi] leading-relaxed"
            multiline
          />
        </div>

        {/* Stats Section */}
        <div className="flex justify-center gap-[6cqi] mb-[2cqi]">
          <div className="text-center">
            <span className="text-gray-500 text-[1cqi] block">Score</span>
            <span className="text-[#3dcd58] text-[2.6cqi] font-bold">80/100</span>
            {isEditing && (
              <span className="block text-[0.8cqi] text-gray-400">(Auto-filled)</span>
            )}
          </div>
          <div className="text-center">
            <span className="text-gray-500 text-[1cqi] block">Result</span>
            <span className="text-[#3dcd58] text-[2.6cqi] font-bold">Pass</span>
            {isEditing && (
              <span className="block text-[0.8cqi] text-gray-400">(Auto-filled)</span>
            )}
          </div>
          <div className="text-center">
            <span className="text-gray-500 text-[1cqi] block">No of Attempts</span>
            <span className="text-[#3dcd58] text-[2.6cqi] font-bold">2</span>
            {isEditing && (
              <span className="block text-[0.8cqi] text-gray-400">(Auto-filled)</span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="w-full flex justify-between items-end mt-auto">
          <div>
            <EditableField
              field="hashtag"
              value={content.hashtag}
              className="text-[#3dcd58] font-medium text-[1.2cqi]"
            />
          </div>
          <div className="text-right text-gray-600 text-[1cqi]">
            <div>
              <span className="font-semibold">Date:</span> 27 Nov 2025
              {isEditing && <span className="text-gray-400 text-[0.8cqi] ml-[0.3cqi]">(Auto)</span>}
            </div>
            <div>
              <span className="font-semibold">Duration:</span> 1 Hrs 30 Mins
              {isEditing && <span className="text-gray-400 text-[0.8cqi] ml-[0.3cqi]">(Auto)</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
