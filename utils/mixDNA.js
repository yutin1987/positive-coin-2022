import _ from "lodash"

export default function mixDNA(dnaA, dnaB) {
  return dnaA.map((value, index) => {
    const samples = [
      ...new Array(6).fill(value),
      dnaB[index],
      ...new Array(2).fill(value | dnaB[index]),
      ...new Array(2).fill(value & dnaB[index]),
      value ^ dnaB[index]
    ];
    return _.sample(samples);
  })
}