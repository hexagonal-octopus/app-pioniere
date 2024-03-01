import '../../scripts/summernote/summernote-lite';

class Editor {
   constructor(el) {
      this.element = el;

      this.initSummerNote();
   }

   initSummerNote() {
      const editor = this.element;

      if(editor.length > 0) {
         editor.summernote({
            height: 200
         });
      }
   }
}

export default Editor;