// ====================================================
// Class {DilationPlayer}
// ====================================================
export default class DilationPlayer {
  completeCounter = 0;

  /**
   * Constructor
   * @param config
   */
  constructor(root, config) {
    config = config || {};
    config.elements = config.elements || {};
    config.elements.root = root;
    this.config = config;
    this.extensions = [];
    this.lifeCycle();
  }

  async lifeCycle(){
    this.create().setup();
  }

  create() {
    if (this.config.extensions) this.config.extensions.forEach(element => {
      this.extensions.push(new element({context: this}));
    });

    return this;
  }

  async setup(){
    this.extensions.forEach(async e => {
      await (e.setup && e.setup());
      this.complete();
    });
  }

  complete(){
    this.completeCounter++;
    if (this.completeCounter == this.extensions.length) this.extensions.forEach(e => e.complete && e.complete());
  }
}
