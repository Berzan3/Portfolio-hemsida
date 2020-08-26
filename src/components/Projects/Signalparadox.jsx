import React from 'react';
import { CopyBlock, dracula } from "react-code-blocks";

function Signalparadox() {  
  return (
<div className = "Signalparadox">
    <title>Signalparadox</title>
    <img src="../img/Signalparadox-stats" alt="*video av spelet*"/>
        <h1>What is this?</h1>
    <body>In SignalParadox you play as Livia Skye who wakes up on an alien infested spaceship trying to figure out what's going on and how to get out.
       You sneak past aliens and solve puzzles in order to make it out alive. 
       The game concept is basically to stealth and solve puzzles through an exciting and scary environment.
    </body>
    <img src="../img/Signalparadox-stats.png" alt="SignalParadox-stats"/>
    
        <h1>My Role</h1>
      <body>Me and my colleagues had several roles in the project because we were so few and we weren't sure of what roles we had under the project. 
      In the end my roles in the project was input programmer, 
      Gameplay designer and Ai programmer.
      </body>

          <h1>My tasks</h1>
          <h3>Decoygrenade</h3>
      <img src="../img/Signalparadox-stats.png" alt="SignalParadox-stats"/>
      <body>
      The player can pick up and throw a decoygrenade to lure a certain alien to it so that they can more safely walk by under a limited time. 
      The trajectory of the grenade is visualized while aiming so the player could aim more easily. 
      If the player aims out of range the visualization and animation stops. 
      </body>
      
      <div style={{ fontFamily: 'IBM Plex Mono' }}>
      <CopyBlock
      text={`using System.Collections;
    using System.Collections.Generic;
    using UnityEngine;
    
    public class DoorController : MonoBehaviour
    {
        public State[] states;
        private StateMachine _stateMachine;
        private BoxCollider _collider;
        private Vector3 _triggerPosition;
        [SerializeField] private LayerMask _layerMask;
        [SerializeField] private bool _hasButton;
        private bool _closeDoor;
        private bool _openDoor;
    
        private void Awake()
        {
            //_pushedButton = false;
            _hasButton = true;
            _stateMachine = new StateMachine(this, states);
            _collider = GetComponent<BoxCollider>();
            _triggerPosition = (_collider.transform.position + (_collider.size.y * 2) * Vector3.down);
        }
    
        private void Update()
        {
            _stateMachine.Run();
        }
    
        internal bool GetPlayerTriggeredCast()
        {
            Physics.BoxCast(_triggerPosition, new Vector3(1, 1, 1) * 1f, Vector3.up, out var _boxCastHit, transform.rotation, 5f, _layerMask, QueryTriggerInteraction.Collide);
            return _boxCastHit.collider && _boxCastHit.collider.CompareTag("Player") && !_hasButton;
        }
    
        internal IEnumerator CooldownTime()
        {
            yield return new WaitForSeconds(2);
            _closeDoor = false;
            _openDoor = false;
        }
    
        internal void ActivateDoor()
        {
            if (_stateMachine.GetCurrentState().name.Equals("ClosedState(Clone)"))
            {
                _closeDoor = true;
            }
            else
            {
                _openDoor = true;
            }
            StartCoroutine("CooldownTime");
        }
    
        internal bool CloseDoor()
        {
            return _closeDoor;
        }
    
        internal bool OpenDoor()
        {
            return _openDoor;
        }
    
        internal bool GetHasButton()
        {
            return _hasButton;
        }
    
        //internal bool SetPushedButton(bool value)
        //{
        //   return _pushedButton = value;
        //}
    }`}
    showLineNumbers
    codeBlock
    language="c"
      theme={dracula}
    // highlight="1-5,7,10,15-20"
  />

</div>
      <img src="../img/Signalparadox-stats.png" alt="SignalParadox-stats"/>
      <body>
        After a certain time or if the player picks up another grenade the currently thrown grenade gets erased.
      </body>
      <img src="../img/Signalparadox-stats.png" alt="SignalParadox-stats"/>
      <body>
        The script for getting the aliens to chase the grenade was made by my co-programmer
      </body>
    
</div>
  );
}

export default Signalparadox;