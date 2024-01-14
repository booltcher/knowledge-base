export const tagRenderer = (input: string) => {
  console.log(input)
  if (!input.length) return;
  return input.split(" ")
}