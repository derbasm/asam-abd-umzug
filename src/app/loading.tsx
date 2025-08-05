export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Wird geladen...</h2>
        <p className="text-gray-600">Bitte warten Sie einen Moment</p>
      </div>
    </div>
  );
}
