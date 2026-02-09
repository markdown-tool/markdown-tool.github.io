"use client";

import { useEffect } from "react";
import Head from "@/app/head";

export default function Page() {
  useEffect(() => {
    import("../libs/main");
  }, []);

  return (
    <>
      <Head />
      <div className="loading">
        <div className="spinner">
          <div className="ball"></div>
          <p>Loading markdown...</p>
        </div>
      </div>
      <div className="control">
        <span className="iconfont icon-setting open"></span>
      </div>
      <div className="menu">
        <span className="iconfont icon-close"></span>
        <div className="detail">
          <div className="tab active">
            <span className="iconfont icon-edit"></span>Content
          </div>
          <div className="tab">
            <span className="iconfont icon-theme"></span>Theme & Effects
          </div>
          <div className="tab download">
            <span className="iconfont icon-download"></span>Download PDF
          </div>
          <div className="tab">
            <span className="iconfont icon-speaker"></span>Speaker View
          </div>
          <div className="content active">
            <div className="header">Editor</div>
            <div className="body editor">
              <div className="settings">
                <button
                  className="button-step"
                  title="Add fragment steps to elements."
                >
                  element step
                </button>
                <button
                  className="button-animation"
                  title="Add page auto-animate."
                >
                  page animate
                </button>
                <button className="button-code" title="Insert code block">
                  insert code
                </button>
                <button className="button-style" title="Custom style">
                  set style
                </button>
                <select className="button-color">
                  <option value="none">text style</option>
                  <option value="border">border</option>
                  <option value="yellow">yellow</option>
                  <option value="red">red</option>
                  <option value="green">green</option>
                  <option value="black">black</option>
                  <option value="purple">purple</option>
                  <option value="white">white</option>
                  <option value="grey">grey</option>
                </select>
                <select className="button-animate">
                  <option value="none">animation</option>
                  <option value="animate__bounce">bounce</option>
                  <option value="animate__flash">flash</option>
                  <option value="animate__backInLeft">
                    backInLeft/Down/Right/Up
                  </option>
                  <option value="animate__bounceInLeft">
                    bounceInLeft/Down/Right/Up
                  </option>
                  <option value="animate__fadeIn">fadeIn</option>
                  <option value="animate__flipInX">flipInX/Y</option>
                  <option value="animate__lightSpeedInLeft">
                    lightSpeedInLeft/Right
                  </option>
                  <option value="animate__rotateIn">rotateIn</option>
                  <option value="animate__zoomIn">zoomIn</option>
                  <option value="animate__slideInLeft">
                    slideInLeft/Down/Right/Up
                  </option>
                  <option value="animate__heartBeat">heartBeat</option>
                  <option value="animate__pulse">pulse</option>
                  <option value="animate__rubberBand">rubberBand</option>
                  <option value="animate__shakeX">shakeX</option>
                  <option value="animate__shakeY">shakeY</option>
                  <option value="animate__headShake">headShake</option>
                  <option value="animate__animate__swing">swing</option>
                  <option value="animate__tada">tada</option>
                  <option value="animate__wobble">wobble</option>
                  <option value="animate__jello">jello</option>
                </select>
              </div>
              <textarea></textarea>
              <div className="uploader">
                <input type="file" id="img-uploader" accept="image/*" />
                <label htmlFor="img-uploader">
                  Click to upload images (.png, .jpg, .gif, max 4MB)
                </label>
              </div>
              <div>
                <button className="button-save">Save & Preview</button>
                <button className="button-reset-simple">Reset - Simple</button>
                <button className="button-reset-complex">
                  Reset - Complex
                </button>
              </div>

              <hr />
              <input
                className="input-url"
                type="text"
                placeholder="Online markdown URL"
              />
              <button className="button-fetch">Fetch to editor</button>
              <button className="button-preview">Preview</button>
              <p className="status">Ready</p>
            </div>
          </div>
          <div className="content">
            <div className="header">Theme & Effects</div>
            <div className="body theme">
              <h5>Themes</h5>
              <div className="themes">
                <figure data-theme="beige">
                  <img src="/theme/beige.png" alt="beige" />
                  <figcaption>beige</figcaption>
                </figure>
                <figure data-theme="black">
                  <img src="/theme/black.png" alt="black" />
                  <figcaption>black</figcaption>
                </figure>
                <figure data-theme="blood">
                  <img src="/theme/blood.png" alt="blood" />
                  <figcaption>blood</figcaption>
                </figure>
                <figure data-theme="league">
                  <img src="/theme/league.png" alt="league" />
                  <figcaption>league</figcaption>
                </figure>
                <figure data-theme="moon">
                  <img src="/theme/moon.png" alt="moon" />
                  <figcaption>moon</figcaption>
                </figure>
                <figure data-theme="night">
                  <img src="/theme/night.png" alt="night" />
                  <figcaption>night</figcaption>
                </figure>
                <figure data-theme="serif">
                  <img src="/theme/serif.png" alt="serif" />
                  <figcaption>serif</figcaption>
                </figure>
                <figure data-theme="simple">
                  <img src="/theme/simple.png" alt="simple" />
                  <figcaption>simple</figcaption>
                </figure>
                <figure data-theme="sky">
                  <img src="/theme/sky.png" alt="sky" />
                  <figcaption>sky</figcaption>
                </figure>
                <figure data-theme="solarized">
                  <img src="/theme/solarized.png" alt="solarized" />
                  <figcaption>solarized</figcaption>
                </figure>
                <figure data-theme="white">
                  <img src="/theme/white.png" alt="white" />
                  <figcaption>white</figcaption>
                </figure>
              </div>

              <h5>Transition</h5>
              <select className="transition">
                <option value="slide">slide</option>
                <option value="fade">fade</option>
                <option value="convex">convex</option>
                <option value="concave">concave</option>
                <option value="zoom">zoom</option>
                <option value="none">none</option>
              </select>

              <h5>Alignment</h5>
              <select className="align">
                <option value="center">center</option>
                <option value="left-top">left top</option>
              </select>
            </div>
          </div>
          <div className="content">
            <div className="header">Download</div>
            <div className="body download">
              <p>Download PDF</p>
            </div>
          </div>
          <div className="content">
            <div className="header">Speaker View</div>
            <div className="body speaker">
              <p>
                Press <strong>S</strong> to open the speaker view.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="reveal">
        <div className="slides"></div>
      </div>
    </>
  );
}
