$(function(){
    let currentQuiz = null;
    $("#startButton").on("click",function(){
        console.log("Hello");
        if(currentQuiz == null)
        {
            currentQuiz=0;
            $("#question").text(questions[0].question);
            $("#options").empty();
            questions[0].answers.forEach(function(element, index, array){
                $("#options").append(
                    `<input name='options' type='radio' value='${index}'><label>${element[0]}</label><br><br>`
                );
            });
            $("#startButton").attr("value","下一題");//把buttom的名稱修改成'下一題'
        }
        else
        {
            $.each($(":radio"),function(i,val){
                if(val.checked){
                    //是否已走到最後要產生結果(A~D)
                    if(isNaN(questions[currentQuiz].answers[i][1])){
                        //通往最終結果
                        var finalResult=questions[currentQuiz].answers[i][1];
                        //顯示最終結果的標題
                        $("#question").text("測驗結果");
                        //將選項區域
                        $("#options").empty();
                        //顯示最終結果
                        $("#options").append(
                            `老虎 : ${finalAnswers["老虎"]}<br>
                            孔雀 : ${finalAnswers["孔雀"]}<br>
                            無尾熊 : ${finalAnswers["無尾熊"]}<br>
                            貓頭鷹 : ${finalAnswers["貓頭鷹"]}<br>
                            變色龍 : ${finalAnswers["變色龍"]}<br>`
                        );
                        currentQuiz = null;
                        $("#startButton").attr("value","重新開始");
                    }
                    else
                    {
                        answerScore[pt++]=i+1;                        
                        //指定下一題，原始資料從1開始，所以要-1
                        currentQuiz = questions[currentQuiz].answers[i][1]-1;
                        //顯示新的題目
                        $("#question").text(questions[currentQuiz].question);
                        $("#options").empty();
                        questions[currentQuiz].answers.forEach(function(element,index,array){
                            $("#options").append(`<input name='options' type='radio' value='${index}'><label>${element[0]}</label><br><br>`);
                        });
                        console.log(answerScore);
                    }
                    return false;//跳離迴圈的方式
                }
            });
        }
    });
});
var pt=0;