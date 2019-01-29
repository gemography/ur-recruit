export default interface Option {
  _id: number;
  type: string;
  children: Array<Option>;
}
