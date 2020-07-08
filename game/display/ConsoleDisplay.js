import TextDisplay from "./TextDisplay.js";

class ConsoleDisplay extends TextDisplay {

  draw(options) {
    super.draw(options)

    let out = []
    for (let t of this.stringBuffer) {
      out.push(t.join(''))
    }
    console.log(out.join("\n"))
  }

}

export default function createConsoleDisplay(stageWidth, stageHeight) {
  return new ConsoleDisplay(stageWidth, stageHeight);
}
