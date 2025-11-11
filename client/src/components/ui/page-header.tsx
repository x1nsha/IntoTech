interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="bg-linear-to-br from-indigo-600 via-purple-600 to-purple-500 py-12 px-6 mt-32">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-white tracking-wider mb-3">
          {title}
        </h1>
        {description && (
          <p className="text-white/90 text-lg">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
