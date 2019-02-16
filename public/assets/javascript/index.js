$(document).ready(function(){

    var articleContainer = $(".article-container");
    $(document).on("click", ".btn.save", handleArtcleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape);

    initPage();

    function initPage() {
        articleContainer.empty();
        $.get("/api/headlines?saved=false")
        .then(function(data){
            //if headllines, render them to page
            if (data && data.length) {
                renderArticles(data);
            }
            else {
                //otherwise render a message that we have no articles for you
                renderEmpty();
            } 
        });
    }

    function renderArticles(articles){
        //an array of JSON containing all avaliable articles in database
        var articlePanels = [];
        for(var i = 0; i < articles.length; i++){
            articlePanels.push(createPanel(articles[i]));
        }

        articleContainer.append(articlePanels);
    }

    function createPanel(article){
        var panel =
        $(["<div class='panel panel-default'>",
        "<div class='panel-heading'>",
        "<h3>",
        article.headline,
        "<a class='btn btn-success save'>",
        "Save Article",
        "</a>",
        "</h3>",
        "</div>",
        "<div class = 'panel-body'>"
    ].join(""));

    panel.data("_id", article._id);

    return panel;
    }

    function renderEmpty(){
        //this function renders to the HTML
        var emptyAlert =
        $(["<div class= 'alert alert-warnng text-center'>",
        "<h4>No new articles for you.</h4>",
        "<div>",
        "<div class='panel panel-default'>",
        "<div class='panel-heading tex-center'>",
        "<h3>What Would You Like To Do?</h3>",
        "</div>",
        "div class='panel-body text-center'>",
        "<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
        "<h4><a href='/saved'>Go to Saved Articles</a></h4>",
        "</div>",
        "</div>"
    ].join(""));
    articleContainer.append(emptyAlert);
    }

    function handleArticleSave() {
        var articleToSave =(this).parnets(".panel").data();
        articleToSave.saved = true;
    
       $.ajax({
           method: "PATCH",
           url:"/api/headlines",
           data: articleToSave
       })
       .then(function(data){
           if (data.ok){
               initPage();
           }
       });
       } 

       function handleArticleScrape() {
           //handles user clicking any scrape new article button
           $.get("/api/fetch")
           .then(function(data){
               initPage();
               bootbox.alert("<h3 class='text-center m-top-80'>" + data.message +"<h3>");
           })
       }
    })