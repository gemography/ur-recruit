export default interface OptionModel {
  _id: number;
  type: string;
  children: Array<OptionModel>;
}
