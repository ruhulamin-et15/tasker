export default function NoTaskFound() {
  return (
    <div className="border border-dashed w-1/2 mx-auto border-yellow-500 bg-gray-700 rounded-lg py-10">
      <p className="text-center text-yellow-500 text-4xl font-bold italic">
        Task list is empty!
      </p>
    </div>
  );
}
