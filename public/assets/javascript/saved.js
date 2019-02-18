$(document).ready(function() {
    var articleContainer = $(".article-container");

   // $(document).on("click", ".btn.delete", handleArticleDelete);
    //$(document).on("click", ".btn.notes", handleArticleNotes);
    //$(document).on("click", ".btn.save", handleNoteSave);
    //$(document).on("click", ".btn.note-delete", handleNoteDelete);

    //initPage();

function initPage(){
    articleContainer.empty();
    $.get("/api/headlines?saved=true").then(function(data){
        if (data && data.length){
            renderArticles(data);
        } else {
            renderEmpty();
        }
    });
}
initPage()
function renderArticles(articles){
var articlePanels =[];
for (var i = 0; i < articles.length;i++) {
articlePanels.push(createPanel(articles[i]));
//     }
 }
}
})