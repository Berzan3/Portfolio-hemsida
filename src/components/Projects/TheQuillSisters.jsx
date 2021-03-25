import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { CopyBlock, dracula } from "react-code-blocks";
import ReactPlayer from "react-player";

const rootContainerElement = document.getElementById('root');

function removeBanner() {
  if(rootContainerElement.classList.length > 0) {
    rootContainerElement.classList.remove('Home');
  }

}

const codeBlockStyle = {
  height: '500px',
  overflowY: 'scroll',
  borderRadius: '5px',
  boxShadow: '1px 2px 3px rgba(0,0,0,0.35)',
  fontSize: '1rem',
  margin: '0px 0.75rem',
  flexWrap: 'wrap',
}

function TheQuillSisters() {
  return (
    <div className="container" onLoad={removeBanner()}>
      <div className="Project">
        <title>The Quill Sisters</title>

        <ReactPlayer
          className='react-player'
          url={require('../../vid/TheQuillSistersVideo.webm')}
          fluid="md"
          playing={true}
          controls={true}
        />

        <div>
          <h1>What is this?</h1>
      <p>The Quill sisters is a third person hack n slash in an egypt setting. 
        You play as Ashley ‘Ash’ Quill searching for her lost sister Zoë Quill in the pyramids of egypt. 
        On her way Ash finds a bracelet that will change her life forever.</p>
      <img src={require("../../img/TheQuillSisters/TQS-stats.png")} alt="TQS-stats" />

          <h1>My Role</h1>
      <p>My roles in the project are Engineer and UI/UX designer. 
        Most of my engineering tasks consist of constructing the different enemies we have. 
        My UI/UX tasks consist mostly of making the different menus and ui-elements in the game.</p>
      <h1>One of My tasks - Engineer</h1>
          <img src={require("../../img/TheQuillSisters/TQSZoeBoss.gif")} alt="TQSZoeBoss-gif" />
          <h2>Boss Zoe Attacks</h2>
        <p>One of my assignments was to make projectile attacks for our last Boss “Zoe the anathematized”.</p>
      <br />
        <h4>Poison Throw</h4>
        <p>
          One of her attacks was supposed to be some sort of ranged poison attack coming from her when she attacks the player. 
          I thought of making some sort of poison projectile using particle effects.</p>
        <br />

        <br/>
        <p>I started by making a shader with a nice texture i found and applied that to a material.</p>
        <img src={require("../../img/TheQuillSisters/TQSShader.gif")} alt="TQSShader-gif" />
        <br/>

        <p>Then I started making the projectile system. 
          I wanted the particle system to emit a fast short burst because it would be activated when the Boss would attack the player with the staff.
          </p>
      <img src={require("../../img/TheQuillSisters/TQSFParticles.gif")} alt="TQSFParticles-gif" />

      <img src={require("../../img/TheQuillSisters/TQSRParticles.gif")} alt="TQSRParticles-gif" />
        <p>I also wanted the projectile system to spawn a puddle on the surface it hits so to do that i made a subEmitter for the thrown poison and
           assigned it to activate when the thrown poison collides with something. 
           The subemitter just spawns the same particle as the thrown but without any movement and with a Horizontal billboard.</p>
      <br />
        <p>A problem that occured was that the puddles didn’t spawn on the ground they spawned in the air. 
          This was because the collider of the thrown poison is a sphere collider and 
          because it’s so big the bottom of the sphere hits the ground and spawns the puddle in the middle of the sphere instead of the bottom.</p>
        <img src={require("../../img/TheQuillSisters/TQSBigCollider.gif")} alt="TQSBigCollider-png" />
          <br />
        <p>I fixed this by making the thrown poison collider very small.</p>

        <img src={require("../../img/TheQuillSisters/TQSSmolCollider.gif")} alt="TQSSmolCollider-gif" />

        <p>What remains was fixing the detection of the player using the particle system. 
          After some research the available options i found was either using the Collision or Trigger module. 
          The collison module is nice because it works much like OnCollisionEnter 
          i don’t even need to check if it hits the player because i can assign which layers it can collide with, 
          the only problem is that the projectiles thrown gets stuck on the player. 
          Using the Trigger module instead solves this but you can’t easily check what it gets triggered by and 
          it gets triggered even though it has an assigned collider it should only collide with.</p>

        <br/> <p>My solution was to use the Trigger module for the thrownPoison and the Collision module for the poisonPuddle.</p> <br/>

          <Accordion className="accordion" defaultActiveKey="1" >
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                PoisonThrown.cs
                <p>click to see code</p>
    </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <div className="codeblock">
                    <CopyBlock
                      text={`
                      namespace Entity.AI.Bosses.Zoe.Attacks
                      {
                          /// <summary>
                          /// A script for triggering damage
                          /// from the PoisonThrown
                          /// </summary>
                          public class PoisonThrown : MonoBehaviour
                          {
                              [SerializeField] 
                              private float damage = 1f;
                              private ParticleSystem _poison;
                              private PlayerHealth _playerHealth;
                              private CharacterController _playerCollider;
                      
                              private readonly List<ParticleSystem.Particle> _enter = new List<ParticleSystem.Particle>();
                      
                              private void Start()
                              {
                                  _poison = GetComponent<ParticleSystem>();
                                  _playerHealth = FindObjectOfType<PlayerHealth>();
                                  _playerCollider = _playerHealth.gameObject.GetComponent<CharacterController>();
                                  _poison.trigger.SetCollider(0, _playerCollider);
                              }
                      
                              private void OnParticleTrigger()
                              {
                                  var enterPs = _poison.GetTriggerParticles(ParticleSystemTriggerEventType.Enter, _enter);
                                  if (enterPs >= 1)
                                  {
                                      _playerHealth.TakeDamage(damage);
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

          <Accordion className="accordion" defaultActiveKey="1" >
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                PoisonPuddle.cs
                <p>click to see code</p>
    </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <div className="codeblock">
                    <CopyBlock
                      text={`
                      namespace Entity.AI.Bosses.Zoe.Attacks
                      {
                          /// <summary>
                          /// A script for triggering damage on the player
                          /// from the poisonPuddles.
                          /// </summary>
                          public class PoisonPuddle : MonoBehaviour
                          {
                              [SerializeField] 
                              private float damage = 2f;
                              private PlayerHealth _playerHealth;
                              private const int PLAYER_LAYER = 9;
                      
                              private void Start()
                              {
                                  _playerHealth = FindObjectOfType<PlayerHealth>();
                              }
                      
                              private void OnParticleCollision(GameObject other)
                              {
                                  if (other.layer == PLAYER_LAYER)
                                  {
                                      _playerHealth.TakeDamage(damage);
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

          <h4>Poison Fan</h4>
        <p>
          The second attack i was assigned to make was a projectile attack with a row of projectiles in a half circle</p>

          <img src={require("../../img/TheQuillSisters/TQSPoisonFanBoss.gif")} alt="TQSPoisonFanBoss-gif" />

        <br />

          <p>
            By reusing the shader for the PoisonThrow and rescaling a sphere i could make something that looks like a projectile.
          </p>

          <img src={require("../../img/TheQuillSisters/TQSPoisonProjectile.gif")} alt="TQSPoisonProjectile-gif" />

          <p>
            Then i just made a prefab which holds five projectiles in a halfcircle and made a script to manage aiming at the player.
          </p>

          <img src={require("../../img/TheQuillSisters/TQSPoisonFan.gif")} alt="TQSPoisonFan-gif" />

          <Accordion className="accordion" defaultActiveKey="1" >
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                PoisonFan.cs
                <p>click to see code</p>
    </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <div className="codeblock">
                    <CopyBlock
                      text={`
                      namespace Entity.AI.Bosses.Zoe.Attacks
                      {
                          /// <summary>
                          /// A script for aiming the projectiles in the right direction
                          /// before releasing them.
                          /// </summary>
                          public class PoisonFan : MonoBehaviour
                          {
                              [SerializeField]
                              private ScriptObjRef<Vector3> playerPosition;
                      
                              private bool _shot;
                              private Rigidbody _projectileRB;
                              
                              private void Start()
                              {
                                  Projectile.Ready += StopLookAt;
                              }
                      
                              private void StopLookAt()
                              {
                                  _shot = true;
                              }
                      
                              private void Update()
                              {
                                  if (!_shot)
                                  {
                                      gameObject.transform.LookAt(playerPosition.Value + Vector3.up);
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

          <br/><br/>              

          <p>I made a script for the projectiles to fire in the parents transform and i also made a simple animation for the projectiles that fires an animation event when
             they are in a projectile looking scale that unparents them and lets them go</p>

          <img src={require("../../img/TheQuillSisters/TQSPoisonProjectileAnim.gif")} alt="TQSPoisonProjectileAnim-gif" />

          <Accordion className="accordion" defaultActiveKey="1" >
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                projectile.cs
                <p>click to see code</p>
    </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <div className="codeblock">
                    <CopyBlock
                      text={`
                      namespace Entity.AI.Bosses.Zoe.Attacks
                      {
                          /// <summary>
                          /// A simple projectile script that heads
                          /// in parent direction.
                          /// </summary>
                          public class Projectile : MonoBehaviour
                          {
                              public static Action Ready;
                              [SerializeField] 
                              private float force = default;
                      
                              private Rigidbody _rigidbody;
                              private float _damage;
                              private float _holdForce;
                              private Transform _parentTransform;
                              
                              private const int PLAYER_LAYER = 9;
                      
                              private void Start()
                              {
                                  _parentTransform = transform.parent;
                                  transform.rotation = _parentTransform.rotation;
                                  _rigidbody = GetComponent<Rigidbody>();
                                  _holdForce = force;
                                  force = 0;
                              }
                      
                              private void FixedUpdate()
                              {
                                  _rigidbody.AddForce(_parentTransform.forward * (force * Time.deltaTime), ForceMode.Impulse);
                              }
                      
                              private void OnTriggerEnter(Collider other)
                              {
                                  if (!other) return;
                                  if (other.gameObject.layer == PLAYER_LAYER)
                                  {
                                      other.gameObject.GetComponent<Health>().TakeDamage(5f);
                                  }
                                  Destroy(gameObject);
                              }
                      
                              public void Release()
                              {
                                  force = _holdForce;
                                  Ready?.Invoke();
                                  transform.parent = null;
                                  transform.rotation = _parentTransform.rotation;
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

          <h1>The process</h1>
       <p>This was fun to make especially the poison particle system. To see it splash on the ground and emit puddles is satisfying.</p>
       <h1>Challenges</h1>
       <p>The biggest challenge for me was to understand the particlesystem detection in Unity.</p>
        <h1>Iteration</h1>
        <p>Some things needs to be reworked or updated but i am quite happy how it is. In the process i learned a bit more about Unity's particle system.</p>
        </div>
      </div>
    </div>
  );
}

export default TheQuillSisters;