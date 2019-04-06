
var iloscKolumn = 1;

document.addEventListener('DOMContentLoaded', function() {
    // here we will put the code of our application
    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (var i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    };

    function generateTemplate(name, data, basicElement) {
        var template = document.getElementById(name).innerHTML;
        var element = document.createElement(basicElement || 'div');
      
        Mustache.parse(template);
        element.innerHTML = Mustache.render(template, data);
      
        return element;
      };

      function Column(name) {
        var self = this;
      
        this.id = randomString();
        this.name = name;
        this.element = generateTemplate('column-template', { name: this.name });
        this.element.querySelector('.column').addEventListener('click', function (event) {
            if (event.target.classList.contains('btn-delete')) {
              self.removeColumn();
              var iloscKolumn = iloscKolumn - 1;
            };
          
            if (event.target.classList.contains('add-card')) {
              self.addCard(new Card(prompt("Enter the name of the card and task description")));
            }
        });
      };
      Column.prototype = {
        addCard: function(card) {
          this.element.querySelector('ul').appendChild(card.element);
        },
        removeColumn: function() {
          this.element.parentNode.removeChild(this.element);
        }
    };
    function Card(description) {
        var self = this;
      
        this.id = randomString();
        this.description = description;
        this.element = generateTemplate('card-template', { description: this.description }, 'li');
        this.element.classList.add('card-default');
        this.element.querySelector('.card').addEventListener('click', function (event) {
          event.stopPropagation();
          
          if (event.target.classList.contains('btn-delete')) {
              self.removeCard();
          };
          if (event.target.classList.contains('status')) {
              self.setStatus();
          }
        });
    };
    Card.prototype = {
        removeCard: function() {
          this.element.parentNode.removeChild(this.element);
        },
        setStatus: function () {
          var option = prompt('How important is this task ? 1 - priority, 2 - urgent, 3 - can wait');
          if (option === '1') {
            this.element.classList.add('card-priority');
            if (this.element.classList.contains('card-default')){
            this.element.classlist.remove('card-default')};
            if (this.element.classList.contains('card-important')){
              this.element.classlist.remove('card-important')};
            if (this.element.classList.contains('card-can-wait')){
              this.element.classlist.remove('card-can-wait')};
          } else {
              if (option === '2') {
                this.element.classList.add('card-important');
                if (this.element.classList.contains('card-default')){
                  this.element.classlist.remove('card-default')};
                  if (this.element.classList.contains('card-priority')){
                    this.element.classlist.remove('card-priority')};
                  if (this.element.classList.contains('card-can-wait')){
                    this.element.classlist.remove('card-can-wait')};
                } else {
                if (option === '3') {
                  this.element.classList.add('card-can-wait');
                  if (this.element.classList.contains('card-default')){
                    this.element.classlist.remove('card-default')};
                    if (this.element.classList.contains('card-important')){
                      this.element.classlist.remove('card-important')};
                    if (this.element.classList.contains('card-priority')){
                      this.element.classlist.remove('card-priority')};
                  } else {
                    alert('Nie wybrano opcji');
                }     
              }  
            }
          }
    };

    function initSortable(id) {
        var el = document.getElementById(id);
        var sortable = Sortable.create(el, {
          group: 'kanban',
          sort: true
        });
    };

    var board = {
      name: 'Kanban Board',
      addColumn: function(column) {
        this.element.appendChild(column.element);
        var iloscKolumn = iloscKolumn - 1;
        initSortable(column.id); //About this feature we will tell later
      },
      element: document.querySelector('#board .column-container')
  }; 

    document.querySelector('#board .create-column').addEventListener('click', function() {
        var name = prompt('Enter a column name ');
        var column = new Column(name);
        board.addColumn(column);
    });

    // CREATING COLUMNS
  var todoColumn = new Column('To do');  
  var doingColumn = new Column('Doing');
  var doneColumn = new Column('Done');

// ADDING COLUMNS TO THE BOARD
board.addColumn(todoColumn);
board.addColumn(doingColumn);
board.addColumn(doneColumn);

// CREATING CARDS
var card1 = new Card('New task');
var card2 = new Card('Create kanban boards');

// ADDING CARDS TO COLUMNS
todoColumn.addCard(card1);
doingColumn.addCard(card2);
console.log('iloscKolumn'+ iloscKolumn);    
            
});