const issues: {
  updated: string;
  summary: string;
  issueKey: string;
  id: string;
  status: {
    name: string;
  };
}[] = JSON.parse(require("fs").readFileSync("./issues.json", "utf8"));

console.log(issues.length);

const x = issues
  .filter(
    (e) =>
      Date.now() - Number(new Date(e.updated)) < 1000 * 60 * 60 * 24 * 7 &&
      ["処理済み", "完了"].includes(e.status.name)
  )
  .map((e) => ({
    updated: e.updated,
    summary: e.summary,
    issueKey: e.issueKey,
    id: e.id,
    statusName: e.status.name,
  }));

// TODO

const f = () => {
  const input: {
    created: string;
    changeLog: {
      field: string;
      newValue: string;
    }[];
  }[] = JSON.parse(require("fs").readFileSync("/dev/stdin", "utf8"));

  console.log(
    input
      .filter(
        (e) =>
          !!e.changeLog.find(
            (l) => l.field === "status" && l.newValue === "処理済み"
          )
      )
      .map((e) => e.created)
  );
};
