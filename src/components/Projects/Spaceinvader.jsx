import React from 'react';
import ReactPlayer from "react-player";
import { Accordion, Card } from 'react-bootstrap';
import { CopyBlock, dracula } from "react-code-blocks";

const codeBlockStyle = {
  height: '500px',
  overflowY: 'scroll',
  borderRadius: '5px',
  boxShadow: '1px 2px 3px rgba(0,0,0,0.35)',
  fontSize: '1rem',
  margin: '0px 0.75rem',
}

function Spaceinvader() {
    return (
        <div className="Project">
            <title>SpaceInvader</title>

        <ReactPlayer
        className='react-player'
        url={'../vid/Spaceinvader_demo.mp4'}
        fluid="md"
        controls='true'
        light='true'
        />
<body>
<h1>What is this?</h1>

This is a much simpler remake of the game Space invaders which i made in a c/c++ programming course at my university.
You move around the small green spaceship at the bottom of the screen, trying to shoot and dodge the aliens slowly coming from the top of the screen.

<h1>Functions</h1>

<h4>briefly about how the code works:</h4>
When the main class starts, it begins with creating an instance of player, enemyfactory -components and adding the collision function to the session.
Then player and enemyFactory are added to a vector for session, then session.run(); starts
which fires the game loop in session. Session then plots its added components
in its vectors and decreases an int variable when any of the components are hit by each other if the bool isCoolidable is true for that Component.
EnemyFactory creates 3 different formations of enemies. Enemy movement and shooting patterns depends on an int time in session that is updated every tick.
Both player and enemy create an instance of the component bullet
when they fire a shot. If the bullet does not collide with something before it reaches the edge of the screen then it is removed.

<Accordion className="accordion" defaultActiveKey="1" >
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Session.cpp
    </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <div className="codeblock">
                <CopyBlock
                  text={`
                  #include "Session.h"
                  #include <SDL.h>
                  #include "Component.h"
                  #include <iostream>
                  #include "Label.h"
                  
                  using namespace std;
                  int points = 0;
                  #define FPS 60
                  
                  Session::Session() {
                      label = Label::getInstance(this);
                  }
                  
                  Session::~Session() {
                      delete label;
                      for (Component* c : comps) {
                          delete c;
                      }
                      comps.clear();
                  }
                  
                  void Session::add(Component* comp) {
                      added.push_back(comp);
                  }
                  
                  void Session::remove(Component* comp) {
                      removed.push_back(comp);
                  }
                  
                  void Session::addCollisionfunc(std::function<bool(const SDL_Rect&,const SDL_Rect&)> func)
                  {
                      fCollide = func;
                  }
                  
                  void Session::run() {
                      bool quit = false;
                      Uint32 tickInterval = 1000 / FPS;
                      while (!quit) {
                          Uint32 nextTick = SDL_GetTicks() + tickInterval;
                          SDL_Event event;
                          while (SDL_PollEvent(&event)) {
                              if (event.type == SDL_KEYDOWN) {
                                  switch (event.key.keysym.sym) {
                                  case SDL_QUIT: quit = true; break;
                                  default: for (Component* c : comps) { c->handleKeyDown(event.key.keysym.sym); } break;
                                  case SDLK_1:
                                      quit = true; 
                                      event.quit;
                                      break;
                                  }
                              }
                          } 
                  
                          for (Component* c : comps) {
                              c->updateTime();
                              c->tick();
                          }
                          for (Component* c : comps) {
                              for (Component* c2 : comps) {
                                  if (c == c2)
                                      continue;
                                      //Egen kollisionsdetekterings class med funktion
                                      bool res = fCollide(c->getRect(), c2->getRect());
                                      if (res == true && c->isCollidable()) {
                                                  label->setText(to_string(points+=1));
                                                  decreaseEnemies();
                                          remove(c2);
                                          remove(c);
                                      }
                              }
                          }
                  
                          for (Component* c : added) {
                              comps.push_back(c);
                              added.clear();
                          }
                  
                          for (Component* c : removed) {
                              for (vector<Component*>::iterator i = comps.begin();
                                  i != comps.end();)
                                  if (*i == c) {
                                      delete *i;
                                      i = comps.erase(i);
                                  }
                                  else
                                      i++;
                              removed.clear();
                          }
                  
                          SDL_SetRenderDrawColor(sys.ren, 0, 0, 0, 0);
                          SDL_RenderClear(sys.ren);
                          for (Component* c : comps)
                              c->draw();
                          label->draw();
                          SDL_RenderPresent(sys.ren);
                          int delay = nextTick - SDL_GetTicks();
                          if (delay > 0)
                              SDL_Delay(delay);
                  
                      } 
                  }
                  `}
                  showLineNumbers
                  codeBlock
                  language="c"
                  theme={dracula}
                  customStyle={codeBlockStyle}
                />
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>

<h4>briefly about how the game works:</h4>
The game i took inspiration from when i created mine is Spaceinvaders.
The player is the green sprite at the bottom, you can move with the keys a for the left and d for right and space for shooting.
You try to shoot the enemies that come from the top of the screen. When you kill an enemy, it is added to your points at the top left.
If all enemies are killed on the screen, new enemies will appear at the top. This continues until the player is hit by an enemy shot which immediately kills the player.

<h1>The process</h1>
I was a bit stressed working on the project because simultaneously as the game was made i was studying for the course exam that had the same deadline as the game 
but i learned a lot of c/c++ and it was a lot of fun.

<h1>Challenges</h1>

It was a big challenge to previously only programmed games with c# and an engine to a new language and no engine.
The other big challenge was to manage memory leakage.
i downloaded a tool called Deleaker to easier spot different leakages i had until i finally managed to get rid of every single one.

<h1>Iteration</h1>

Of course i could have done much more with the game but because i was learning c/c++ and studying for an exam at the same time i am pleased with how it turned out.
</body>

        </div>
    );
}

export default Spaceinvader;