  // const for card , colors
  const cards=['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
  const colors =['heart','spade','diamond','club'];  // ** color  used to store suit of card
  
  /**
  to convert the card number array card objects for attribute color and card value 
  */
  function findCard(number){
    var cardIndex = number % 13;
    var colorsIndex = (number - cardIndex)/ 13 ;
    // console.log({
    // 'color':colors[colorsIndex],
    // 'card':cards[cardIndex+1],
    // });

    return {
    'color':colors[colorsIndex],  // ** color key used to store suit of card
    'card':cards[cardIndex],
    };
  }
  
  //  constants for card rank , color rank 
  const rank = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
  const colorrank = ['club','diamond','heart','spade'];
  // strings for detecting sequence
  const sequenceStr = 'A2345678910JQKA';
  const revSequenceStr = 'AKQJ1098765432A';

  /**
  function to determine the winner
  for every user set of cards , iterate to using different condn to find winner set of card 
  input - array of user cards
  output - winner arary of cards
  */
  function compareUserCards(sampleinput){
    // convert to  card objects
    var userCards = sampleinput.map((cards)=>{
      return cards.map(findCard);
    });

    // condn user cards has same rank 
    var hasSameRankCards = userCards.map(checkSameRankCards);
    console.log('hasSameRankCards',hasSameRankCards);
    var index = hasSameRankCards.indexOf(true);
    if(index>=0){
      return sampleinput[index];
    }

    // condn user has pure sequnce
    var hasPureSequence = userCards.map(checkPureSequence);
    console.log('hasPureSequence',hasPureSequence);
    index = hasSameRankCards.indexOf(true);
    if(index>=0){
      return sampleinput[index];
    }
    // condn for a sequnce
    var hasSequence = userCards.map(checkSequence);
    console.log('hasSequence',hasSequence);
    index = hasSequence.indexOf(true);
    if(index>=0){
      return sampleinput[index];
    }

    // condn for same color
    var hasSameColor = userCards.map(checkSameColor);
    console.log('hasSameColor',hasSameColor);
    index = hasSameColor.indexOf(true);
    if(index>=0){
      return sampleinput[index];
    }

    // condn for  pair
    var hasPair = userCards.map(checkPair);
    console.log(' hasPair',hasPair);
    index = hasPair.indexOf(true);
    if(index>=0){
      return sampleinput[index];
    }

    // last condn for which user has highest card
    var highestCards = userCards.map(getHighestCard);
    console.log(' highestCards',highestCards);
    var highestCard = highestCardValue(highestCards);
    // debugger;
    var acc = 0;
    highestCards.reduce((value,acc)=>{
      if(value==highestCard){acc++}
    });
    if(acc>1){ // users has same highest card
      index = userCards.map(preferedCardByColor);
    }else{ // only one highest card
      index = highestCards.indexOf(highestCard);
    }
    return sampleinput[index];



  }

  // if cards have same rank
  function checkSameRankCards(cards ){
    for(var i = 0; i <= cards.length - 1; i++) {
        if(cards[i].card !== cards[0].card) {
            return false;
        }
    }
    return true;
  };


  // check sequnce and suit ( ** color key used to store suit of card)
  function checkPureSequence(cards){
    var cardNum = '';
    // same color
    for(var i = 0; i <=cards.length - 1; i++) {
        // store the number
        cardNum = cardNum + cards[i].card;
        // console.log(i,cardNum);

        if(cards[i].color !== cards[0].color) {
            return false;
        }
    }
    // console.log('cardNum',cardNum);

    // if same color then seq exists
    if((sequenceStr.includes(cardNum))|| (revSequenceStr.includes(cardNum))){
      return true;
    };
    return false;
  }

  function checkSequence(cards){
    var cardNum = '';
    for(var i = 0; i <=cards.length - 1; i++) {
        // store the number
        cardNum = cardNum + cards[i].card;
    }
    // if seq exists
    if((sequenceStr.includes(cardNum))|| (revSequenceStr.includes(cardNum))){
      return true;
    };
    return false;
  }

  function checkSameColor(cards){
    // same color
    for(var i = 0; i <=cards.length - 1; i++) {
        if(cards[i].color !== cards[0].color) {
            return false;
        }
    }
    return true;
  }

  function checkPair(cards){
    var occur={};
    for(var i = 0; i <=cards.length - 1; i++) {
      if(occur[cards[i].card]){
        occur[cards[i].card] +=1;
        if(occur[cards[i].card]==2){ // if count is 3 already carsds should be winner
          return true;
        }
      }else{
        occur[cards[i].card] = 1;
      }
    }
    // console.log('fe',occur);
    return false;
  }

  // get the highest among set of card object
  function getHighestCard(cards){
    var highestCardIndex = -1;
    let cardIndex , highestCard ;
    for(var i = 0; i <=cards.length - 1; i++) {
      cardIndex = rank.indexOf(cards[i].card);
      if(cardIndex>highestCardIndex){
        highestCardIndex = cardIndex;
        highestCard=cards[i].card;
      }
    }

    return highestCard;
  }

  // get card ranked by suit (have used color for suit)
  function preferedCardByColor(cards){
    var highestcolorIndex =-1;
    var colorIndex , highestCardIndex;

    for(var i = 0; i <=cards.length - 1; i++) {
      colorIndex = colorrank.indexOf(cards[i].color);
      if(colorIndex>highestcolorIndex){
        highestcolorIndex = colorIndex;
        highestCardIndex=i;
      }
    }
    return highestCardIndex;
  }
  // get highest card from arrau of cards
  function highestCardValue(highestCards){
    var highestCardIndex =-1,highestCard,cardIndex;
    for(let i = 0; i <=highestCards.length - 1; i++) {
      cardIndex = rank.indexOf(highestCards[i]);
      if(cardIndex>highestCardIndex){
        highestCardIndex = cardIndex;
        highestCard=highestCards[i];
      }
    }
    return highestCard;
  }



// sample test cases
  var sampleinput = [[12,23,45],[0,32,50]];

 // by sequence
  var sampleinput2=[[1,8,1],[29,8,27],[0,14,28]];
  console.log('ans: ',compareUserCards(sampleinput2));

  // by color
  var sampleinput3=[[0,8,1],[29,8,27],[0,14,26]];
  console.log('ans: ',compareUserCards(sampleinput3));

  // by highest card winner
  var sampleinput4=[[1,8,18],[29,8,27],[0,15,16]];
  console.log('ans: ',compareUserCards(sampleinput4));
