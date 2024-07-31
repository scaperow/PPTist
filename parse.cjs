let { AirParser } = require("airppt-parser");


let pptParser = new AirParser( "/home/scaperow/workspace/PPTist/sample.pptx");
waitForParsing();

async function waitForParsing() {
  let result = await pptParser.ParsePowerPoint();

  //returns an array of parsable slides including
  //Powerpoint Elements and some extra MetaData
  console.log(result);
}
