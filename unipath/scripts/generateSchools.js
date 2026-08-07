const fs = require("fs");

const schools = [
  // British Columbia
  ["ubc","UBC","University of British Columbia","British Columbia","Vancouver","University","ubc.ca"],
  ["sfu","SFU","Simon Fraser University","British Columbia","Burnaby","University","sfu.ca"],
  ["uvic","UVic","University of Victoria","British Columbia","Victoria","University","uvic.ca"],
  ["bcit","BCIT","British Columbia Institute of Technology","British Columbia","Burnaby","College","bcit.ca"],
  ["kpu","KPU","Kwantlen Polytechnic University","British Columbia","Surrey","University","kpu.ca"],
  ["capu","CapU","Capilano University","British Columbia","North Vancouver","University","capilanou.ca"],
  ["ufv","UFV","University of the Fraser Valley","British Columbia","Abbotsford","University","ufv.ca"],
  ["tru","TRU","Thompson Rivers University","British Columbia","Kamloops","University","tru.ca"],
  ["viu","VIU","Vancouver Island University","British Columbia","Nanaimo","University","viu.ca"],
  ["ecu","ECU","Emily Carr University of Art + Design","British Columbia","Vancouver","University","ecuad.ca"],
  ["langara","Langara","Langara College","British Columbia","Vancouver","College","langara.ca"],
  ["douglas","Douglas","Douglas College","British Columbia","New Westminster","College","douglascollege.ca"],

  // Alberta
  ["ualberta","UAlberta","University of Alberta","Alberta","Edmonton","University","ualberta.ca"],
  ["ucalgary","UCalgary","University of Calgary","Alberta","Calgary","University","ucalgary.ca"],
  ["ulethbridge","ULethbridge","University of Lethbridge","Alberta","Lethbridge","University","uleth.ca"],
  ["athabasca","Athabasca","Athabasca University","Alberta","Athabasca","University","athabascau.ca"],
  ["mru","MRU","Mount Royal University","Alberta","Calgary","University","mtroyal.ca"],
  ["macewan","MacEwan","MacEwan University","Alberta","Edmonton","University","macewan.ca"],
  ["nait","NAIT","Northern Alberta Institute of Technology","Alberta","Edmonton","College","nait.ca"],
  ["sait","SAIT","Southern Alberta Institute of Technology","Alberta","Calgary","College","sait.ca"],

  // Saskatchewan
  ["usask","USask","University of Saskatchewan","Saskatchewan","Saskatoon","University","usask.ca"],
  ["uregina","Regina","University of Regina","Saskatchewan","Regina","University","uregina.ca"],
  ["saskpoly","Sask Polytech","Saskatchewan Polytechnic","Saskatchewan","Saskatoon","College","saskpolytech.ca"],

  // Manitoba
  ["umanitoba","Manitoba","University of Manitoba","Manitoba","Winnipeg","University","umanitoba.ca"],
  ["uwinnipeg","Winnipeg","University of Winnipeg","Manitoba","Winnipeg","University","uwinnipeg.ca"],
  ["brandon","Brandon","Brandon University","Manitoba","Brandon","University","brandonu.ca"],

  // Ontario
  ["uoft","UofT","University of Toronto","Ontario","Toronto","University","utoronto.ca"],
  ["waterloo","Waterloo","University of Waterloo","Ontario","Waterloo","University","uwaterloo.ca"],
  ["mcmaster","McMaster","McMaster University","Ontario","Hamilton","University","mcmaster.ca"],
  ["queens","Queen's","Queen's University","Ontario","Kingston","University","queensu.ca"],
  ["western","Western","Western University","Ontario","London","University","uwo.ca"],
  ["york","York","York University","Ontario","Toronto","University","yorku.ca"],
  ["tmu","TMU","Toronto Metropolitan University","Ontario","Toronto","University","torontomu.ca"],
  ["uottawa","uOttawa","University of Ottawa","Ontario","Ottawa","University","uottawa.ca"],
  ["carleton","Carleton","Carleton University","Ontario","Ottawa","University","carleton.ca"],
  ["guelph","Guelph","University of Guelph","Ontario","Guelph","University","uoguelph.ca"],
  ["laurier","Laurier","Wilfrid Laurier University","Ontario","Waterloo","University","wlu.ca"],
  ["brock","Brock","Brock University","Ontario","St Catharines","University","brocku.ca"],
  ["windsor","Windsor","University of Windsor","Ontario","Windsor","University","uwindsor.ca"],
  ["ontariotech","Ontario Tech","Ontario Tech University","Ontario","Oshawa","University","ontariotechu.ca"],
  ["lakehead","Lakehead","Lakehead University","Ontario","Thunder Bay","University","lakeheadu.ca"],
  ["nipissing","Nipissing","Nipissing University","Ontario","North Bay","University","nipissingu.ca"],

  // Quebec
  ["mcgill","McGill","McGill University","Quebec","Montreal","University","mcgill.ca"],
  ["concordia","Concordia","Concordia University","Quebec","Montreal","University","concordia.ca"],
  ["udem","UdeM","Université de Montréal","Quebec","Montreal","University","umontreal.ca"],
  ["laval","Laval","Université Laval","Quebec","Quebec City","University","ulaval.ca"],
  ["usherbrooke","Sherbrooke","Université de Sherbrooke","Quebec","Sherbrooke","University","usherbrooke.ca"],
  ["uqam","UQAM","Université du Québec à Montréal","Quebec","Montreal","University","uqam.ca"],

  // Atlantic Canada
  ["dalhousie","Dalhousie","Dalhousie University","Nova Scotia","Halifax","University","dal.ca"],
  ["smu","SMU","Saint Mary's University","Nova Scotia","Halifax","University","smu.ca"],
  ["stfx","StFX","St. Francis Xavier University","Nova Scotia","Antigonish","University","stfx.ca"],
  ["unb","UNB","University of New Brunswick","New Brunswick","Fredericton","University","unb.ca"],
  ["moncton","Moncton","Université de Moncton","New Brunswick","Moncton","University","umoncton.ca"],
  ["upei","UPEI","University of Prince Edward Island","PEI","Charlottetown","University","upei.ca"],
  ["memorial","Memorial","Memorial University of Newfoundland","Newfoundland","St. John's","University","mun.ca"]
];


const formatted = schools.map(s => ({
  id:s[0],
  shortName:s[1],
  name:s[2],
  province:s[3],
  city:s[4],
  type:s[5],
  domain:s[6]
}));


fs.writeFileSync(
  "data/canadianSchools.json",
  JSON.stringify(formatted,null,2)
);


console.log(`Created database with ${formatted.length} schools`);