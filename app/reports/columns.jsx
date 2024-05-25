"use client";

export const columns = [
  {
    accessorFn: (row) =>
      new Date(
        row.receivedate.slice(0, 4),
        row.receivedate.slice(5, 7),
        row.receivedate.slice(8, 10)
      ).toLocaleDateString(),
    header: "Report Date",
    meta: {
      className: "w-1/5",
      sortable: true,
    },
  },
  {
    accessorFn: (row) => {
      let drugs = "";
      row.patient.drug.forEach((drug) => {
        drugs += drug.medicinalproduct + ", ";
      });
      return drugs.slice(0, -2);
    },
    header: "Drug(s)",
    meta: {
      className: "w-1/3",
    },
  },
  {
    accessorFn: (row) => {
      let reactions = "";
      row.patient.reaction.forEach((reaction) => {
        reactions += reaction.reactionmeddrapt + ", ";
      });
      return reactions.slice(0, -2);
    },
    header: "Reaction(s) (MedDRA)",
    meta: {
      className: "w-1/3",
    },
  },
];
