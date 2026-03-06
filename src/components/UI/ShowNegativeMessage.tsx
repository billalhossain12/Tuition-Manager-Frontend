export default function ShowNegativeMessage({input}:{input:string}) {
  const isNegative = Number(input) < 0;
  return (
    <>
      {isNegative && (
        <p className="text-red-500 text-[14px] font-semibold mt-1">
          Negative value is not allowed
        </p>
      )}
    </>
  );
}
