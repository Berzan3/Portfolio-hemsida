import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { CopyBlock, dracula } from "react-code-blocks";

function Signalparadox() {
  return (
    <div className="Project">
      <title>Signalparadox</title>
      <img src="../img/Signalparadox-stats" alt="*video av spelet*" />
      <h1>What is this?</h1>
      <body>In SignalParadox you play as Livia Skye who wakes up on an alien infested spaceship trying to figure out what's going on and how to get out.
      You sneak past aliens and solve puzzles in order to make it out alive.
      The game concept is basically to stealth and solve puzzles through an exciting and scary environment.
    </body>
      <img src="../img/Signalparadox-stats.png" alt="SignalParadox-stats" />

      <body>
        <h1>My Role</h1>
      Me and my colleagues had several roles in the project because we were so few and we weren't sure of what roles we had under the project.
      In the end my roles in the project was input programmer,
      Gameplay designer and Ai programmer.
      <h1>My tasks</h1>
        <h3>Decoygrenade</h3>
      </body>
      <img src="../img/grenadethrow.gif" alt="grenadethrow-gif" />
      <body>
        The player can pick up and throw a decoygrenade to lure a certain alien to it so that they can more safely walk by under a limited time.
        The trajectory of the grenade is visualized while aiming so the player could aim more easily.
        If the player aims out of range the visualization and animation stops.
      </body>
      <br />
      <body>
        To make the visualization of the grenades trajectory look better than just a colored thin line i made a simple texture that makes the linerenderer look dotted.
        <br />
        <img src="../img/dottedlineTexture.png" alt="dottedline-texture" />
      </body>

      <Accordion className="accordion" defaultActiveKey="1" >
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            ThrowDecoyGrenade.cs
    </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <div className="codeblock">
                <CopyBlock
                  text={`private void Throw()
      {
          shouldDrawPath = false;
          currentState = States.HoldingNoGrenade;
          onThrowEvent?.Invoke();
          if (thrownGrenade != null)
          {
              Destroy(thrownGrenade.gameObject);
              StopCoroutine(despawnGrenadeCoroutine);
          }
          thrownGrenade = Instantiate(grenadePrefabRigidbody, grenadeProp.position, grenadeProp.rotation);
          thrownGrenade.AddForce(Vector3.up * gravity);
          thrownGrenade.velocity = CalculateLaunchData().initialVelocity;
          hasGrenade = false;
          despawnGrenadeCoroutine = StartCoroutine(DespawnGrenade());
      }

      private LaunchData CalculateLaunchData()
      {
          Vector3 newTarget = GetTarget().point;
          if (GetTarget().collider && (newTarget.y - grenadeProp.position.y) < currentThrowHeight)
          {
              float displacementY = newTarget.y - grenadeProp.position.y;
              Vector3 displacementXZ = new Vector3(newTarget.x - grenadeProp.position.x, 0, newTarget.z - grenadeProp.position.z);
              float time = Mathf.Sqrt(-2 * currentThrowHeight / gravity) + Mathf.Sqrt(2 * (displacementY - currentThrowHeight) / gravity);
              Vector3 velocityY = Vector3.up * Mathf.Sqrt(-2 * gravity * currentThrowHeight);
              Vector3 velocityXZ = displacementXZ / time;
              return new LaunchData(velocityXZ + velocityY * -Mathf.Sign(gravity), time);
          }
          onAbortAimEvent?.Invoke();
          return new LaunchData(Vector3.zero, 0f);
      }

      private void DrawPath()
      {
          if (currentState == States.Disabled || currentState == States.Occupied)
          {
              StopAiming();
              return;
          }
          LaunchData launchData = CalculateLaunchData();
          if (launchData.initialVelocity != Vector3.zero && launchData.timeToTarget != 0f)
          {
              Vector3 previousDrawPoint = grenadeProp.position;
              onAimingEvent?.Invoke();
              for (int i = 0; i <= lineRendererResolution; i++)
              {
                  float simulationTime = i / (float)lineRendererResolution * launchData.timeToTarget;
                  Vector3 displacement = launchData.initialVelocity * simulationTime + Vector3.up * gravity * simulationTime * simulationTime / 2f;
                  Vector3 drawPoint = grenadeProp.position + displacement;
                  previousDrawPoint = drawPoint;
                  AddLinePoint(previousDrawPoint);
                  currentState = States.Aiming;
              }
          }
          else
          {
              currentState = States.HoldingGrenade;
              shouldDrawPath = false;   
          }
      }`}
                  showLineNumbers
                  codeBlock
                  language="c"
                  theme={dracula}
                  customStyle={{
                    height: '250px',
                    overflowY: 'scroll',
                    borderRadius: '5px',
                    boxShadow: '1px 2px 3px rgba(0,0,0,0.35)',
                    fontSize: '0.75rem',
                    margin: '0px 0.75rem',
                  }}
                // highlight="1-5,7,10,15-20"
                />
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>

      <body>
        After a certain time or if the player picks up another grenade the currently thrown grenade gets erased.
      </body>
      <img src="../img/grenadethrow2.gif" alt="grenadethrow2-gif" />
      <body>
        The script for getting the aliens to chase the grenade was made by my co-programmer
      </body>

      <img src="../img/chargerCharging.gif" alt="chargerCharging-gif" />
      <body>
        <h3>The chargerEnemy</h3>
        The ChargerEnemy is an enemy that charges at the player at a very fast speed and if the player is caught in the charge the player dies when the charger smashes into something.
      </body>
      <br />
      <body>
        The charger has several states it switches between and uses a navmesh agent to move around.
        The Charger´s states are: Patrolstate, huntstate, chargeupstate, chargestate, stunstate, deadstate.
      </body>
      <br />
      <body>
        At first i tried to use a boxcollider with ontriggerEnter to know when it has stopped charging
        but after some time working on the project my co-programmer suggested i could just measure the speed after it has started charging.
      </body>

      <Accordion className="accordion" defaultActiveKey="1" >
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            ChargeState.cs
    </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <div className="codeblock">
                <CopyBlock
                  text={`namespace AI.Charger.AIStateMachine
                  {
                      [CreateAssetMenu(menuName = "AIStates/Charger/ChargeState")]
                      public class ChargeState : ChargerBaseState
                      {
                          [SerializeField] private float chargeSpeed;
                          [SerializeField] private AudioClip hitWallSound;
                          [SerializeField] private AudioClip startChargeSound;
                          [SerializeField] private float wallSoundThreshold = 10f;
                          [SerializeField] private float destroyGlassThreshold = 20f;
                          private float previousFrameSpeed;
                          public static Action<GameObject> onChargeEvent, onStunnedEvent, onSlowChargeEvent, onFastChargeEvent;
                  
                          public override void Enter()
                          {
                              base.Enter();
                              Ai.AudioSource.PlayOneShot(startChargeSound);
                              onChargeEvent?.Invoke(Ai.gameObject);
                          }
                  
                          public override void Run()
                          {
                              if (previousFrameSpeed - Ai.aiRigidbody.velocity.magnitude > 0f)
                                  ChargeEnded();
                              Charge();
                          }
                  
                          private void Charge()
                          {
                              previousFrameSpeed = Ai.aiRigidbody.velocity.magnitude;
                              Ai.aiRigidbody.AddForce(Ai.ChargeDirection.normalized * (chargeSpeed * Time.deltaTime));
                              if (Ai.aiRigidbody.velocity.magnitude > destroyGlassThreshold)
                                  onFastChargeEvent?.Invoke(Ai.gameObject);
                              if (!Ai.EnemyTrigger.IsTouchingTaggedObject) return;
                              Ai.target.transform.parent = Ai.transform;
                              Ai.CaughtPlayer();
                          }
                  
                          private void ChargeEnded()
                          {
                              if (previousFrameSpeed - Ai.aiRigidbody.velocity.magnitude > wallSoundThreshold)
                              {
                                  Ai.AudioSource.PlayOneShot(hitWallSound);
                                  onStunnedEvent?.Invoke(Ai.gameObject);
                              }
                              else
                                  onSlowChargeEvent?.Invoke(Ai.gameObject);
                              Ai.aiRigidbody.velocity = Vector3.zero;
                              previousFrameSpeed = 0f;
                              if (Ai.target.transform.IsChildOf(Ai.transform))
                                  Ai.KillPlayer();
                              Ai.target.transform.parent = null;
                              Ai.agent.enabled = true;
                              stateMachine.TransitionTo<StunState>();
                          }
                      }
                  }
                  `}
                  showLineNumbers
                  codeBlock
                  language="c"
                  theme={dracula}
                  customStyle={{
                    height: '250px',
                    overflowY: 'scroll',
                    borderRadius: '5px',
                    boxShadow: '1px 2px 3px rgba(0,0,0,0.35)',
                    fontSize: '0.75rem',
                    margin: '0px 0.75rem',
                  }}
                />
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <body>
        The charger is part of a puzzle the player must solve by dodging and luring the charger to charge into a glass wall.
        If the charger reaches a certain minimum speed and charges into the glasswall it destroys the wall creating a path and then dies.
       </body>

      <img src="../img/chargerDestroyGlass.gif" alt="chargerDestroyGlass-gif" />
      <Accordion className="accordion" defaultActiveKey="1" >
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            GlassWallTrigger.cs
    </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <div className="codeblock">
                <CopyBlock
                  text={`namespace Interactables.Triggers.Events
                  {
                      public class GlassWallTrigger : MonoBehaviour
                      {
                          [SerializeField] private float chargerLookAngle = 0.5f;
                          private BoxCollider[] colliers;
                          private Animator animator;
                          private AudioSource audioSource;
                          private bool isDestroyable;
                          private Vector3 glassForward;
                  
                          public static Action onBrokenEvent;
                          
                          private void Awake()
                          {
                              colliers = GetComponents<BoxCollider>();
                              animator = GetComponent<Animator>();
                              audioSource = GetComponent<AudioSource>();
                              glassForward = new Vector3(transform.forward.x, 0, transform.forward.z);
                  
                              ChargeState.onStunnedEvent += charger => isDestroyable = false;
                              ChargeState.onSlowChargeEvent += charger => isDestroyable = false;
                              ChargeState.onFastChargeEvent += charger => isDestroyable = true;
                          }
                  
                          private void OnDestroy()
                          {
                              ChargeState.onStunnedEvent -= charger => isDestroyable = false;
                              ChargeState.onSlowChargeEvent -= charger => isDestroyable = false;
                              ChargeState.onFastChargeEvent -= charger => isDestroyable = false;
                          }
                  
                          private void OnTriggerEnter(Collider other)
                          {
                              if (!isDestroyable) return;
                              var chargerForward = new Vector3(other.transform.forward.x, 0, other.transform.forward.z);
                              if (other.CompareTag("Enemy") && Vector3.Dot(glassForward, chargerForward) > chargerLookAngle)
                                  DestoryWall();
                          }
                  
                          private void DestoryWall()
                          {
                              for (var i = 0; i < colliers.Length; i++)
                              {
                                  colliers[i].enabled = false;
                              }
                              animator.SetTrigger("GlassBreak");
                              audioSource.Play();
                              onBrokenEvent?.Invoke();
                          }
                      }
                  }`}
                  showLineNumbers
                  codeBlock
                  language="c"
                  theme={dracula}
                  customStyle={{
                    height: '250px',
                    overflowY: 'scroll',
                    borderRadius: '5px',
                    boxShadow: '1px 2px 3px rgba(0,0,0,0.35)',
                    fontSize: '0.75rem',
                    margin: '0px 0.75rem',
                  }}
                />
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>

      <body>
        <h3>Miscellaneous</h3>
        To make the grenade pickup more realistic and look better i wanted the grenade in the players hand to appear when the animation of the pickup reached out and grabbed.
        So my first thought was to make a timer in the script to decide when to enable the grenade but then i realised i could make it much easier with an animation event.
      </body>
      <img src="../img/grenadePickupAnimation.gif" alt="grenadepickupAnimation-gif" />
      <body>
        To make the transition between levels feel more smooth i made a simple fade in with an elevator sound which triggers at the end of a level,
        when the elevator sound has finished the player is taken to the next level.
      </body>
      <img src="../img/fadeinLevelTransition.gif" alt="fadeinleveltransition-gif" />
      <body>
        My programming colleague advised me to make a simple Hinge joint motor instead of an animation to make this cool machine one of my designers made spin.
      </body>
      <img src="../img/motorSpin.gif" alt="motorSpin-gif" />

      <body>
        <h1>The process</h1>
       This was my biggest game project i've helped make at university so far.
       I was really exhausted in the beginning of the project because of a previously very intense programming course and that in the beginning of this course we had to make a 2d and 3d controller.
       The objective with the project was to make a 3D game.
       <h3>Challenges</h3>
       This was a big challenge, i had never made a project of this size before with so many people. My Unity and C# knowledge was also a bit novice.
        Another challenge was that our group wanted the grenade trajectory to be visualized like a parabola of some sort.
        I was in charge of the grenade and i had never made something so complex with a linerenderer before.
        I looked up articles and videos on the internet to understand the math for calculating the curve. After i got down the math, the rest went easier.
        <h3>Iteration</h3>
        The ChargerEnemy had to have it´s Charge Mechanism reworked several times throughout the project until it was bug free and felt good.
        As my first big Game project, with only a limited amount of Unity and programming knowledge,
        i definitely struggled with my tasks. But this is what my colleagues expected me to make,
        so i worked a lot to make sure it worked in the end.
        I'm also very thankful for my more experienced co-programmer who i could always ask questions or get help from if i needed it.

        Looking back through my weekly reviews of my work and how my code improved through the project,
        I'm proud of how i fought to make sure it worked because i learned a lot in the process.
         </body>

    </div>
  );
}

export default Signalparadox;