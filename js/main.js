console.log('Starting up');

var gProjs =
  [
    {
      id: "guessWho",
      name: "Guess who am I",
      title: "Guess WHO ?",
      desc: "This fun project was designed to show one can have with JavaScript. it's a selfing learning TRIVIA game, when the Computer dont know the answer he will ask you to give him a hint and an question",
      url: "portfolio/thumb/guesswho.jpg",
      publishedAt: "july 2020",
      labels: ["JavaScript, Decision TREE", " " + "Prompts"],
    },
    {
      id: "touchNums",
      name: "The Touch Numbers Game",
      title: "The Touch Numbers Game",
      desc: "In this game the user have to click in the right order of numbers in the shortest time possible, ",
      url: "portfolio/thumb/touchNums.jpg",
      publishedAt: "jul 2020",
      labels: ["Matrixes js", " " + "Mouse Events"],
    },

    {
      id: "inPic",
      name: "In Picture Game",
      title: "What's in the Picture?",
      desc: "Choose between 2 pictuers the right phrase",
      url: "portfolio/thumb/inPic.jpg",
      publishedAt: "july 2020",
      labels: ["CSS", " " + "Mouse events"],
    },

    {
      id: "minesweeper",
      name: "Minesweeper",
      title: "Minesweeper game",
      desc: "This well built game provides hours of fun! just like the windows classic, you must click on empty tiles that have no mines. If a mine is clicked the game is over, the user loses. The mines are surrounded by numbers that show the user if a mine is close. The user can right-click to create a flag over tiles that are suspected to be mines, if the user covers all the mines they win!",
      url: "portfolio/thumb/minesweeper.jpg",
      publishedAt: "july 2020",
      labels: ["Matrixes", " " + "Mouse events"],
    },


  ];

$(document).ready(function () {
  initPage(gProjs);

  $('.formSub').click(function () {
    var subject = $('#subject').val();
    var email = $('#email').val();
    var message = $('#message').val();
    var url = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${message}`;
    window.location = url;
  });

  //Nav Bar toggle Contact - opens aside;
  $('.toggle-side-bar').on('click', function (e) {
    $('.offcanvas-aside').toggleClass("offcanvas-aside-open");
    e.preventDefault();
  })
});


function initPage(proj) {
  var strHtmlBoxes = '';
  gProjs.forEach(function innerHtml(proj, idx) {
    var strHtmlBox =
      `<div class="col-md-4 col-sm-6 portfolio-item">
                <a class="portfolio-link" data-toggle="modal" href="#${proj.id}">
                    <div class="portfolio-hover">
                        <div class="portfolio-hover-content">
                            <i class="fa fa-plus fa-5x "></i>
                        </div>
                    </div>
                    <img class="img-fluid" src="img/${proj.url}" >
                </a>
                <div class="portfolio-caption">
                    <h4>${proj.title}</h4>
                    <p class="text-muted">${proj.labels}</p>
                </div>
            </div>`;
    strHtmlBoxes += strHtmlBox;


    var strHtmlModal = `
        <div class="portfolio-modal modal fade" id="${proj.id}" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="close-modal" data-dismiss="modal">
              <div class="lr">
                <div class="rl"></div>
              </div>
            </div>
            <div class="container">
              <div class="row">
                <div class="col-lg-8 mx-auto">
                  <div class="modal-body">
                    <!-- Project Details Go Here -->
                    <h2>${proj.name}</h2>
                    <p class="item-intro text-muted">${proj.title}</p>
                    <img class="img-fluid d-block mx-auto" src="img/portfolio/full/${proj.id}.jpg" alt="">
                    <a class="btn btn-primary proj-link" href="proj/${proj.id}/index.html">
                    <i class="fa fa-play-circle"></i>
                        Link To Project</a>
                    <p class="proj-desc">${proj.desc}
                    </p>
                    <ul class="list-inline">
                      <li>Published At: ${proj.publishedAt}</li>
                      <li>Client: Mr.Bit coding-academy</li>
                      <li>Category: Games</li>
                    </ul>
                    <button class="btn btn-primary" data-dismiss="modal" type="button">
                        <i class="fa fa-times"></i>
                        Close Project</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
    $('.modals').append(strHtmlModal);
  });
  $('.portfolio-items').html(strHtmlBoxes);
}




