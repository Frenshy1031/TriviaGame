$(document).ready(function(){
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })	

  var trivia = {
   
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
   
    questions: {
      q1: 'Which of these is NOT a name of one of the Spice Girls?',
      q2: 'What year were CDs first introduced in America?',
      q3: 'Which future "Friends" star did Bruce Springsteen pull up on stage in one of his music videos?',
      q4: 'When was Elvis’ first ever concert?',
      q5: "Which country is Gangnam Style from?",
      q6: 'Which mathematical symbol is not the name of an Ed Sheeran album',
      q7: "Which Beatle performed a James Bond theme song?",
      q8: "Complete the Rihanna lyric: We found love in a....?",
      q9: "In which video does Michael Jackson play a zombie?",
      q10: "Which of these is NOT a Whitney Houston song?"

    },
    options: {
      q1: ['Sporty Spice', 'Adrianna Grande Spice', 'Scary Spice', 'Posh Spice'],
      q2: ['1982', '1983', '1984', '1985'],
      q3: ['Courteney Cox','Jennifer Aniston', 'Matt LeBlanc','David Schwimmer'],
      q4: ['1954', '1964', '1950', '1980'],
      q5: ['North Korea','Japan','China','South Korea'],
      q6: ['Plus','Divide','Subtract','Multiply'],
      q7: ['John', 'George Harrison', 'Paul McCartney','Ringo Starr'],
      q8: ['Dangerous place', 'Deadly place','Hopeless place', 'Ravaged place' ],
      q9: ['Bad','Speed Demon','Beat it', 'Thriller'],
      q10:['I wanna Dance with Somebody','Time After Time','Greatest Love of all','Time After Time']

    },
    answers: {
      q1: 'Adrianna Grande Spice',
      q2: '1983',
      q3: 'Courteney Cox',
      q4: '1954',
      q5: 'South Korea',
      q6: 'Subtract',
      q7: 'Paul McCartney',
      q8: 'Hopeless place',
      q9: 'Thriller',
      q10: 'Time After Time'

    },
   
    startGame: function(){
   
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
  
      $('#game').show();
      
      $('#results').html('');
    
      $('#timer').text(trivia.timer);
      
      $('#start').hide();
  
      $('#remaining-time').show();
      
      trivia.nextQuestion();
      
    },
    
    nextQuestion : function(){
      
      
      trivia.timer = 15;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      
      
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
      
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      
      
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
      
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-outline-secondary">'+key+'</button>'));
      })
      
    },
    
    timerRunning : function(){
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
    
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
      
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
    
        $('#results')
          .html('<h4>Thank you for playing!</h4>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Please play again!</p>');
        
        
        $('#game').hide();
        $('#start').show();
      }
      
    },
    guessChecker : function() {
      
      var resultId;
      
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      
      if($(this).text() === currentAnswer){
    
        $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000 * 1);
        $('#results').html('<h2> You guessed the correct Answer!</h2>');
      }
    
      else{
        
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000 * 1);
        $('#results').html('<h3>You guessed it wrong! '+ currentAnswer +'</h3>');
      }
      
    },
    
    guessResult : function(){
      
      trivia.currentSet++;
      
      $('.option').remove();
      $('#results h3').remove();
      trivia.nextQuestion();
       
    }
  
  }
  