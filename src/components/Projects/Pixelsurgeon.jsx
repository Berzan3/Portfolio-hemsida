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

function Pixelsurgeon() {
    return (
        <div className="Project">
            <title>EnviromentUnreal</title>

                <ReactPlayer
                className='react-player'
                url={'../vid/Pixelsurgeon_DemoVideo.mp4'}
                fluid="md"
                controls={true}
                light='true'/>

                <div>
                <h1>What is this?</h1>
                Pixel surgeon is a learning game about the body's anatomy sitting in a 2d operating room.
                Inspired by games like Surgeon Simulator and the board game Operation.
                The game is intended for a broad target group as there is some blood in the game about 8 years and up.
                The game is that the player is a surgeon who must perform different transplants of different body parts.
                The level of difficulty in the game is stepped up in the form of the player having to replace more and more organs (maximum 3).
                When the player cuts off organs or limbs, the patient starts bleeding differently depending on which part of the body is lost,
                as you can see on a blood Monitor in the lower right corner of the screen and how much blood may be lost until the patient dies.
                The player uses the saw to cut off limbs, the chapel to cut loss organs and open up the torso and needle to sew everything back.
                When the player has cut loss the bad body part and replaced it with a healthy body part and then sewed everything together without the patient losing too much blood,
                the player has passed surgery and presenters then with a rating on its effort. If the player fails,
                he also gets a rating. The grading system goes from F to A and depends on how much blood the patient has lost and how correct the placement of the healthy body part is.
                In addition to teaching about the body's anatomy,
                we list a couple of fun facts about each of the body parts that you can read if you press "Organ info" up to the left and click or have clicked on a body part.

                <br/>
                <img src="../img/Pixelsurgeon/pixelsurgeon-stats.png" alt="pixelsurgeon-stats-img" />

                <h1>My tasks</h1>
                My role I worked on was mainly to create the controls for the game and handle input but I also made a script to handle when the patient should start or
                stop bleeding on those different blood positions on the body that chose the arms,
                legs and torso.
                Then I also modified the blood-particle effect that bleeds on the different blood positions and
                made a short animation and sound effect for when the player gets his rating.

                <h4>controls</h4>
                Controls are based on the new input system and are then the script that handles the player's input and is the controller for the player.
                The actions the player can do in the game are then: pick up body parts / tools, rotate tools and sew / cut.
                The controls for performing these actions are based entirely on the mouse and include: left-click to click and hold objects,
                right-click to use the tool you are holding, and scroll wheel to rotate tools 90 degrees at a time.
                Picking up objects is then done with the help of a RaycastAll which its hit list sorts according to stock order and
                whether it is a tool or body part to decide what to pick up.
                It is necessary to remove bugs and annoying moments such as picking up something that is on the bottom even though it is slightly above that object.
                Using a tool is managed with the help of a switch kit which, depending on which tool was used,
                sends an event with the body part on which it was used. This is listened to by the Bodypart script,
                which decides whether the body part should be removed or inserted.
                Rotate is managed by first checking if you are holding something and if it is a tool.
                Then you check if the mouse rotates up or down and depending on this rotate +90 degrees or -90 degrees.

                <Accordion className="accordion" defaultActiveKey="1" >
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            Controls.cs
    </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <div className="codeblock">
                                    <CopyBlock
                                        text={`
                  namespace Player
                  {
                      public class Controls : MonoBehaviour
                      {
                          public static Action<GameObject> OnCutEvent,
                              OnSawEvent,
                              OnSewnEvent,
                              OnBodyPartPickupEvent,
                              OnToolPickupEvent,
                              OnDropBodyPartEvent,
                              OnDropToolEvent;
                  
                          public static Action OnToolRotateEvent;
                  
                          [SerializeField] private LayerMask mask;
                          private Camera _camera;
                          private PlayerActionsScript _controls;
                          private GameObject _heldObj;
                          private SpriteRenderer _heldObjSpriteRen;
                          private bool _isHolding;
                          private Vector2 _mousePos;
                          private int _oldSortOrder;
                          private float _startPosX, _startPosY;
                  
                          private void Awake()
                          {
                              _controls = new PlayerActionsScript();
                              _camera = Camera.main;
                          }
                  
                          private void Start()
                          {
                              _controls.Player.Scroll.performed += Scroll;
                              _controls.Player.LeftClick.started += _ => LeftClick();
                              _controls.Player.LeftClick.performed += _ => LeftClickRelease();
                              _controls.Player.RightClick.performed += _ => RightClick();
                          }
                  
                          private void Update()
                          {
                              if (_isHolding) HoldObj();
                          }
                  
                          private void OnEnable()
                          {
                              _controls.Enable();
                          }
                  
                          private void OnDisable()
                          {
                              _controls.Disable();
                          }
                  
                          private void Scroll(InputAction.CallbackContext ctx)
                          {
                              if (_isHolding && _heldObj.layer == 8) Rotate(ctx);
                          }
                  
                          private void LeftClickRelease()
                          {
                              {
                                  if (_heldObj == null) return;
                                  _isHolding = false;
                                  _heldObj.transform.localScale = new Vector3(1f, 1f, 1f);
                                  _heldObjSpriteRen.sortingOrder = _oldSortOrder;
                                  switch (_heldObj.layer)
                                  {
                                      case 8:
                                          OnDropToolEvent?.Invoke(_heldObj);
                                          break;
                                      case 9:
                                          OnDropBodyPartEvent?.Invoke(_heldObj);
                                          break;
                                  }
                  
                                  _heldObj = null;
                              }
                          }
                  
                          private void RightClick()
                          {
                              if (_heldObj == null) return;
                              switch (_heldObj.name)
                              {
                                  case "Saw":
                                      OnSawEvent?.Invoke(_heldObj.GetComponent<Tool.Tool>().GetBodyPart());
                                      break;
                                  case "Scalpel":
                                      OnCutEvent?.Invoke(_heldObj.GetComponent<Tool.Tool>().GetBodyPart());
                                      break;
                                  case "Sewingkit":
                                      OnSewnEvent?.Invoke(_heldObj.GetComponent<Tool.Tool>().GetBodyPart());
                                      break;
                              }
                          }
                  
                          private void LeftClick()
                          {
                              _mousePos = _controls.Player.Mouseposition.ReadValue<Vector2>();
                              _mousePos = _camera.ScreenToWorldPoint(_mousePos);
                              var hits = Physics2D.RaycastAll(_mousePos, Vector2.zero, 0f, mask);
                              var gameobjects = hits.Where(hit => hit.collider.gameObject.activeSelf)
                                  .Select(hit => hit.collider.gameObject).ToArray();
                              if (gameobjects.Length <= 0) return;
                              _heldObj = (
                                  from
                                      item in gameobjects
                                  orderby
                                      item.transform.GetChild(0).GetComponent<SpriteRenderer>()?.sortingLayerID,
                                      item.transform.GetChild(0).GetComponent<SpriteRenderer>()?.sortingOrder descending
                                  where
                                      mask == (mask | (1 << item.transform.gameObject.layer))
                                  select
                                      item.transform.gameObject
                              ).ToArray().First();
                  
                              if (_heldObj.layer == 9 && _heldObj.GetComponent<BodyPart>().IsAttached())
                              {
                                  _heldObj = null;
                                  return;
                              }
                  
                              _heldObjSpriteRen = _heldObj.transform.GetChild(0).GetComponent<SpriteRenderer>();
                              _oldSortOrder = _heldObjSpriteRen.sortingOrder;
                              _heldObjSpriteRen.sortingOrder = 10;
                  
                              switch (_heldObj.layer)
                              {
                                  //layer 8 == Tools
                                  case 8:
                                      _startPosX = 0;
                                      _startPosY = 0;
                                      OnToolPickupEvent?.Invoke(_heldObj);
                                      break;
                                  //layer 9 == Organs
                                  case 9:
                                      _startPosX = _mousePos.x - _heldObj.transform.position.x;
                                      _startPosY = _mousePos.y - _heldObj.transform.position.y;
                                      OnBodyPartPickupEvent?.Invoke(_heldObj);
                                      break;
                              }
                  
                              _heldObj.transform.localScale = new Vector3(1.2f, 1.2f, 1.2f);
                              _isHolding = true;
                          }
                  
                          private void HoldObj()
                          {
                              _mousePos = _controls.Player.Mouseposition.ReadValue<Vector2>();
                              _mousePos = _camera.ScreenToWorldPoint(_mousePos);
                              _heldObj.transform.position = new Vector3(_mousePos.x - _startPosX, _mousePos.y - _startPosY, 0);
                          }
                  
                          private void Rotate(InputAction.CallbackContext ctx)
                          {
                              OnToolRotateEvent?.Invoke();
                              if (ctx.ReadValue<Vector2>().y > 0)
                                  _heldObj.transform.Rotate(Vector3.forward, 90f);
                              else
                                  _heldObj.transform.Rotate(Vector3.forward, -90f);
                          }
                      }
                  }`}
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

                <h4>BleedSpotManager</h4>
                Manages whether the patient should start bleeding or stop bleeding at the different blood positions.
                This is done first with the help of a dictionary entering the names of the body parts as keys and the blood positions as values.
                The organs are commonly represented by a blood position "Thorax".
                Then when a tool is used,
                a function is started in the script that checks which tool was used and which body part it was used on and depending on this start or
                stop the bleeding at the different blood positions.

                <Accordion className="accordion" defaultActiveKey="1" >
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            BleedSpotManager.cs
    </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <div className="codeblock">
                                    <CopyBlock
                                        text={`
                  public class BleedSpotManager : MonoBehaviour
                  {
                      Dictionary<string, ParticleSystem> _bleedSpots;
                      private string[] _bleedSpotNames = { "ArmLeft", "ArmRight", "RightLeg", "LeftLeg", "Thorax" };
                      private int _currentdetachedOrgans;
                  
                      private void Awake()
                      {
                          _bleedSpots = new Dictionary<string, ParticleSystem>();
                  
                          for (int i = 0; i < transform.childCount; i++)
                          {
                              _bleedSpots.Add(_bleedSpotNames[i], transform.GetChild(i).GetComponent<ParticleSystem>());
                          }
                          BodyPart.OnToolUsedEvent += ToolUsed;
                      }
                  
                      private void OnDestroy()
                      {
                          BodyPart.OnToolUsedEvent = null;
                      }
                  
                      private void ToolUsed(BodyPart bp, string tool)
                      {
                  
                          if (bp.name == "Ribcage") return;
                  
                          if (bp.tag == "Organ")
                          {
                              if (tool == "Scalpel")
                              {
                                  _currentdetachedOrgans++;
                                  _bleedSpots["Thorax"].Play();
                                  return;
                              }
                              else if (tool == "Sewingkit")
                              {
                                  if (_currentdetachedOrgans - 1 == 0)
                                  {
                                      _currentdetachedOrgans--;
                                      _bleedSpots["Thorax"].Stop();
                                      return;
                                  }
                                  _currentdetachedOrgans--;
                                  return;
                              }
                          }
                          else
                          {
                              if (tool == "Sewingkit")
                              {
                                  _bleedSpots[bp.name].Stop();
                                  return;
                              }
                              else
                              {
                                  if (!_bleedSpots[bp.name].isPlaying)
                                      _bleedSpots[bp.name].Play();
                                  return;
                              }
                          }
                  
                      }
                  
                  }`}
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

                <h4>Miscellaneous</h4>
                I made an animation that visualizes that the grade slides and fades into the screen.
                Then I also made a slightly comical almost fart-like sound that is played in connection with the animation.

                <h1>The process</h1>
                This was a small but fun 2d project to make! The goal of the project was to make a learning game.

                <h1>Challenges</h1>
                 The biggest challenge for me was to make the Controls work as intended.

                <h1>Iteration</h1>
                We were sure that we wanted to teach about the anatomy of the body from the beginning,
                but if we were to teach basic information about the different parts of the body,
                we changed it to short fun facts, as we judged that it would be very boring to just sit and read paragraphs of facts.
                Other things we changed about were the number of tools and whether the player could do brain transplants.
                We considered brain transplants to be too unrealistic as we still try to relate to some form of semi-realism in the game.
                The second was that we were content with only three tools because if we had added more, we think it would have been too cumbersome to keep track of.
                Certain things got reworked under the project but i am pleased about how it turned out and the work me and my colleagues put into the project.
                In the end i learned more about working on 2D projects in Unity.
                </div>    
        </div>
    );
}

export default Pixelsurgeon;