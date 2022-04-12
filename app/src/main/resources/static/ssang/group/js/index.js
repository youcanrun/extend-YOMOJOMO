const PATH = {
  'groupList' : '/group/list',
  'groupGet' : '/group/get',
  'applyQuestion' : '/applyQuestion/findQuestion'
}
// Array.prototype.map ( callbackfn [ , thisArg ] )

// 모임정보 팝업
$(document).on("click","button.show",function(){
  document.querySelector(".background").className = "background show";
  var value = $(this).val();
  fetch(`${PATH.groupGet}?no=${value}`)
  .then(function(response){
    return response.json()
  }).then(function(result){
    console.log(result.data)
    document.querySelector(".popup-group-name").innerText = result.data.groupName;
    document.querySelector(".popup-group-content").innerText = result.data.intro;
    $('#apply-form-btn').val(result.data.no);
  })
})

// 가입신청서 팝업
$(document).on("click","#apply-form-btn",function(){
  document.querySelector(".background").className = "background";
  document.querySelector(".report-background").className = "report-background show";
  var value = $(this).val();
  console.log(value)
  fetch(`/applyform/findQuestion?no=${value}`)
    .then(function(res){
      return res.json();
    }).then(function(result){
      if (result.status == "fail") {
        window.alert("서버 요청 오류!");
        console.log(result.data);
        return;
    }
      console.log(result.data);
    // 핸들바
    var writtenContainer = document.querySelector("#handlebars-container2");
    var divTemplate = document.querySelector("#applyList-template");
    var htmlGenerator = Handlebars.compile(divTemplate.innerHTML);
    writtenContainer.innerHTML = htmlGenerator(result.data);
    // console.log(htmlGenerator(result.data));
    });
})

//신청하기
document.querySelector("#apply").addEventListener("click", close);


//닫기
var cols = document.querySelectorAll("button.btn-close");
[].forEach.call(cols,function(col){
  col.addEventListener("click",close)
})
// document.querySelector(".close").addEventListener("click", close);
function close() {
  document.querySelector(".report-background").className = "report-background";
  document.querySelector(".background").className = "background";
}

// 모임리스트
  var writtenContainer = document.querySelector("#handlebars-container");

  var divTemplate = document.querySelector("#div-template");

  var htmlGenerator = Handlebars.compile(divTemplate.innerHTML);
      
fetch(PATH.groupList)
    .then(function(response) {
      return response.json();
    })
    .then(function(result) {
      if (result.status == "fail") {
          window.alert("서버 요청 오류!");
          console.log(result.data);
          return;
      }
      for (var group of result.data) {
        if (group.logo == null) {
        	group.logo = "default.jpg";
        }
        writtenContainer.innerHTML = htmlGenerator(result.data);
      }
    });

    
    // 시,도 불러오기
    let selectSiList = document.querySelector("#nameSi");
    var selectSiOption = document.querySelector("#optionSi-template");
    var opGernerator = Handlebars.compile(selectSiOption.innerHTML);

    $.ajax({
      url : "/activeLocal/silistcate",
      type : "POST",
      async : false,
      success: function(result) {
          // console.log(result.data);
          selectSiList.innerHTML = opGernerator(result.data);
      }
    });

    // 군구 불러오기
    let selectGuList = document.querySelector("#nameGu");
    var selectGuOption = document.querySelector("#optionGu-template");
    var opGernerator = Handlebars.compile(selectGuOption.innerHTML);

    $(document).on("click", "#nameSi", function() {
      // console.log("바뀜");
      $.ajax({
        url : "/activeLocal/gulistcate",
        type : "POST",
        async : false,
        data: {nameSi: $("#nameSi option:selected").val()},
        success: function(result) {
            console.log(result.data);
            selectGuList.innerHTML = opGernerator(result.data);
        }
      }); //ajax END
    }); //nameSi change End

    $("#nameSi").on("click", function() {  
      if ($("#nameSi option:selected").val() == 0) {
        fetch(PATH.groupList)
        .then(function(response) {
          return response.json();
        })
        .then(function(result) {
          if (result.status == "fail") {
            window.alert("서버 요청 오류!");
            console.log(result.data);
            return;
          } else {
            console.log(result);
            writtenContainer.innerHTML = htmlGenerator(result.data);
          }
        });
      }
    })
    
    // 시, 도 카테고리 선택하면 게시글 리스트 불러오기
    // $("#nameSi").on("click", function() {
    //   console.log("바뀜");
    //   $.ajax({
    //     url : "/pickme/selectedSicate",
    //     type : "POST",
    //     async : false,
    //     data : {"activeLocal.nameSi" : $("#nameSi option:selected").val()},
    //     success : function(result) {
    //       console.log(result.data);
    //       tbody.innerHTML = htmlGenerator(result.data);
    //     }
    //   }) //ajax END
    // });//nameSi change End
    
    
    // 군, 구 카테고리 선택하면 게시글 리스트 불러오기
    // $("#nameGu").on("click", function() { //id가 nameGu를 클릭하면 발생되는 이벤트 시작
    //   console.log("바뀜");
    //   $.ajax({
    //     url : "/pickme/selectedGucate", //url 요청
    //     type : "POST",
    //     async : false,
    //     data : {"activeLocal.no" : $("#nameGu option:selected").val()}, //파라미터로 gms_activelocal의 번호를 보낸다.
    //     success : function(result) { //받아온 list로 handlebars를 화면에 나오게 한다.
    //       // console.log(result.data);
    //       tbody.innerHTML = htmlGenerator(result.data);
    //     }
    //   }) //ajax END
    // });//nameGu change End //id가 nameGu를 클릭하면 발생되는 이벤트 끝
    
    
    // document.querySelector("#x-create-btn").onclick = function(){
    //   location.href="form.html";
    // };






    // 버튼클릭이벤트 
      // document.querySelector(".new-post-btn").onclick = function() {
      //   window.location.href = "form.html";
      // };
      // $(document).on("click",".board-edit",function(){
      //   window.location.href = "view.html";
      // })

