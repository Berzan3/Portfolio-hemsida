import React from 'react';
import ReactPlayer from "react-player";

function EnviromentUnreal() {
    return (
        <div className="Project">
            <title>EnviromentUnreal</title>

            <ReactPlayer
                className='react-player'
                url={'../vid/animeradScen_AndreasBerzelius.mp4'}
                fluid="md"
                controls= { true }
                light='true'
            />

            <div>
                <h1>What is this?</h1>

                This is a 3D-environment i created in Unreal Engine at a 3D-rendering course at University.

                <h1>The Work</h1>

                <h4>MoodBoard</h4>
                <img id="bigImage" src="../img/EnviromentUnreal/MoodBoard.png" alt="moodboard-png" />


                <h4>AssetList</h4>
                <img id="bigImage" src="../img/EnviromentUnreal/Assetlist.png" alt="Assetlist-png" />
                <br />
                <br />

                <img src="../img/EnviromentUnreal/modelering1.png" alt="modelering1-png" />
                <img src="../img/EnviromentUnreal/modelering2.png" alt="modelering2-png" />
                <img src="../img/EnviromentUnreal/modelering3.png" alt="modelering3-png" />
                <img src="../img/EnviromentUnreal/modelering4.png" alt="modelering4-png" />
                <img src="../img/EnviromentUnreal/modelering5.png" alt="modelering5-png" />
                <br />
                <br />
                The materials and textures were not made by me but imported from my university.
                When the buildng parts were done it was time to make the scene in Unreal engine.
                <br />

                <img src="../img/EnviromentUnreal/scenbygge1.png" alt="scenbygge1-png" />
                <img src="../img/EnviromentUnreal/scenbygge2.png" alt="scenbygge2-png" />

                <br />
                <br />
                i made two different vertex paint materials one for building walls and one for the house foundation.

                <img src="../img/EnviromentUnreal/vertexpaint1.png" alt="vertexpaint1-png" />
                <img src="../img/EnviromentUnreal/MaterialEditorn_M_1.png" alt="MaterialEditorn_M_1-png" />
                <img src="../img/EnviromentUnreal/vertexpaint2.png" alt="vertextpaint2-png" />
                <img src="../img/EnviromentUnreal/MaterialEditorn_M_2.png" alt="MaterialEditorn_M_2-png" />
                <br />
                <br />

                I made five different particle effects: torchfire, bonfire, fireflies, chimneysmoke and candle-light.
                <img src="../img/EnviromentUnreal/particles3.png" alt="particles3-png" />
                <img src="../img/EnviromentUnreal/particles1.png" alt="particles1-png" />
                <br />
                <br />
                The torchfire effect is very similar to bonfire, just slimmer, smaller and dimmer light.
                <img src="../img/EnviromentUnreal/particles2.png" alt="particles2-png" />


                <img id="bigImage" src="../img/EnviromentUnreal/moons.png" alt="moons-png" />
                <br />
                The moons are two massive spheres with a transparent plane behind them that radiates a glow.
                They also have a script that makes them always face the player,
                so if the player moves far into a direction the moons still look realistic.
                <br />
                <br />

                After i was pleased about how my scene looked with all the different post-process effects i recorded the video you can see at the top.
                The sounds are not made by me but imported.
                I had some trouble first with the grass flickering and not loading in properly when i filmed but that was fixed by giving
                the camera some starterframes to load in everything before starting to film.

                <img src="../img/EnviromentUnreal/camerawork.png" alt="camerawork-png" />

                <h1>Challenges</h1>
                The biggest and only challenge for me during this project was modeling and uv-mapping.
                I had to simplify my design off the buildings because it would have taken too much time off the course to do the whole project.

                <h1>Iteration</h1>
                This was a fun project to do and I didn´t stumble onto many problems during my work.
                I learned how to do basic modeling, uv-mapping and how to make a beautiful scene in Unreal engine.

            </div>

        </div>
    );
}

export default EnviromentUnreal;