var button_colors = ["red", "blue", "green", "yellow"];
var user_clicked_patern = [];
var game_pattern = [];
var first_keypress = false;
var level = 0;

$(".btn").click(function()
{
  var user_chosen_color = $(this).attr("id");
  user_clicked_patern.push(user_chosen_color);
  play_sound(user_chosen_color);
  animate_press(user_chosen_color);
  check_answer(user_clicked_patern.length - 1);
});

function next_sequence()
{
  level++;
  $("#level-title").text("Level " + level);
  var random_number = Math.floor(Math.random() * 4);
  var random_chosen_color = button_colors[random_number];
  game_pattern.push(random_chosen_color);
  $("#" + random_chosen_color).fadeIn(100).fadeOut(100).fadeIn(100);
  play_sound(random_chosen_color);
}

function check_answer(current_level)
{
  if (game_pattern[current_level] === user_clicked_patern[current_level])
  {
    if (game_pattern.length === user_clicked_patern.length)
      setTimeout(function()
    {
      next_sequence();
      user_clicked_patern = [];
    }, 1000);
  }
  else
  {
    play_sound("wrong");
    $("body").addClass("game-over");
    setTimeout(function()
    {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    start_over();
  }
}

function start_over()
{
  level = 0;
  game_pattern = [];
  first_keypress = false;
  user_clicked_patern = [];
}

function play_sound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animate_press(current_color)
{
  $("#" + current_color).addClass("pressed");
  setTimeout(function()
  {
    $("#" + current_color).removeClass("pressed");
  }, 100);
}

$(document).on("keydown", function()
{
  if (!first_keypress)
  {
    $("#level-title").text("Level " + level);
    next_sequence();
    first_keypress = true;
  }
});
