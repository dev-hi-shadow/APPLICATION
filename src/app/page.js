"use client";
import { useRouter } from "next/router";
import Link from "next/link";
import { Card, CardBody } from "@nextui-org/react";
import CountUp from "react-countup";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>

      <div className="page-wrapper">
        <div className="page-body">
          <div className="container-xl">
            <div className="row row-deck row-cards">
              {["sales", "product-list", "users", "feedbacks"].map((item) => (
                <div key={item} className="col-sm-6 col-lg-3">
                  <Card className="w-full  shadow-xl card-link-pop">
                    <CardBody>
                      <div className="h1 mb-3">
                        {" "}
                        <CountUp end={75} />%
                      </div>
                      <div className="d-flex mb-2">
                        <div>
                          {" "}
                          <CountUp end={(item.length * 4).toFixed(2)} />%
                        </div>
                        <div className="ms-auto">
                          <span className="text-green d-inline-flex align-items-center lh-1">
                            7%{" "}
                            {/* Download SVG icon from http://tabler-icons.io/i/trending-up */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon ms-1"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M3 17l6 -6l4 4l8 -8" />
                              <path d="M14 7l7 0l0 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                      <div className="progress progress-sm">
                        <div
                          className="progress-bar bg-primary"
                          style={{ width: `${item.length * 4}%` }}
                          role="progressbar"
                          aria-valuenow="75"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          aria-label="75% Complete"
                        >
                          <span className="visually-hidden">75% Complete</span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              ))}

              <div className="col-12">
                <div className="row row-cards">
                  <div className="col-sm-6 col-lg-3">
                    <div className="card card-sm">
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col-auto">
                            <span className="bg-primary text-white avatar">
                              {/* Download SVG icon from http://tabler-icons.io/i/currency-dollar */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2" />
                                <path d="M12 3v3m0 12v3" />
                              </svg>
                            </span>
                          </div>
                          <div className="col">
                            <div className="font-weight-medium">
                              <CountUp end={132} /> Sales
                            </div>
                            <div className="text-muted">
                              12 waiting payments
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-lg-3">
                    <div className="card card-sm">
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col-auto">
                            <span className="bg-green text-white avatar">
                              {/* Download SVG icon from http://tabler-icons.io/i/shopping-cart */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                                <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                                <path d="M17 17h-11v-14h-2" />
                                <path d="M6 5l14 1l-1 7h-13" />
                              </svg>
                            </span>
                          </div>
                          <div className="col">
                            <div className="font-weight-medium">
                              <CountUp end={78} /> Orders
                            </div>
                            <div className="text-muted">32 shipped</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-lg-3">
                    <div className="card card-sm">
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col-auto">
                            <span className="bg-twitter text-white avatar">
                              {/* Download SVG icon from http://tabler-icons.io/i/brand-twitter */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z" />
                              </svg>
                            </span>
                          </div>
                          <div className="col">
                            <div className="font-weight-medium">
                              <CountUp end={378} /> Shares
                            </div>
                            <div className="text-muted">16 today</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-lg-3">
                    <div className="card card-sm">
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col-auto">
                            <span className="bg-facebook text-white avatar">
                              {/* Download SVG icon from http://tabler-icons.io/i/brand-facebook */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                              </svg>
                            </span>
                          </div>
                          <div className="col">
                            <div className="font-weight-medium">
                              <CountUp end={778} /> Likes
                            </div>
                            <div className="text-muted">21 today</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="row row-cards">
                  <div className="col-12">
                    <span className="h3">Recent Comments </span>
                    <div className="card" style={{ height: "36rem" }}>
                      <div className="card-body card-body-scrollable card-body-scrollable-shadow">
                        <div className="divide-y">
                          <div>
                            <div className="row">
                              <div className="col-auto">
                                <span className="avatar">JL</span>
                              </div>
                              <div className="col">
                                <div className="text-truncate">
                                  <strong>Jeffie Lewzey</strong> commented on
                                  your <strong>Im not a witch</strong> post.
                                </div>
                                <div className="text-muted">yesterday</div>
                              </div>
                              <div className="col-auto align-self-center">
                                <div className="badge bg-primary"></div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="row">
                              <div className="col-auto">
                                <span
                                  className="avatar"
                                  style={{
                                    backgroundImage:
                                      "url(./static/avatars/002m.jpg)",
                                  }}
                                ></span>
                              </div>
                              <div className="col">
                                <div className="text-truncate">
                                  Its <strong>Mallory Hulme</strong>s birthday.
                                  Wish him wells
                                </div>
                                <div className="text-muted">2 days ago</div>
                              </div>
                              <div className="col-auto align-self-center">
                                <div className="badge bg-primary"></div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="row">
                              <div className="col-auto">
                                <span
                                  className="avatar"
                                  style={{
                                    backgroundImage:
                                      "url(./static/avatars/003m.jpg)",
                                  }}
                                ></span>
                              </div>
                              <div className="col">
                                <div className="text-truncate">
                                  <strong>Dunn Slane</strong> posted{" "}
                                  <strong>Well, what do you want?</strong>.
                                </div>
                                <div className="text-muted">today</div>
                              </div>
                              <div className="col-auto align-self-center">
                                <div className="badge bg-primary"></div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="row">
                              <div className="col-auto">
                                <span
                                  className="avatar"
                                  style={{
                                    backgroundImage:
                                      "url(./static/avatars/000f.jpg)",
                                  }}
                                ></span>
                              </div>
                              <div className="col">
                                <div className="text-truncate">
                                  <strong>Emmy Levet</strong> created a new
                                  project <strong>Morning alarm clock</strong>.
                                </div>
                                <div className="text-muted">4 days ago</div>
                              </div>
                              <div className="col-auto align-self-center">
                                <div className="badge bg-primary"></div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="row">
                              <div className="col-auto">
                                <span
                                  className="avatar"
                                  style={{
                                    backgroundImage:
                                      "url(./static/avatars/001f.jpg)",
                                  }}
                                ></span>
                              </div>
                              <div className="col">
                                <div className="text-truncate">
                                  <strong>Maryjo Lebarree</strong> liked your
                                  photo.
                                </div>
                                <div className="text-muted">2 days ago</div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="row">
                              <div className="col-auto">
                                <span className="avatar">EP</span>
                              </div>
                              <div className="col">
                                <div className="text-truncate">
                                  <strong>Egan Poetz</strong> registered new
                                  client as <strong>Trilia</strong>.
                                </div>
                                <div className="text-muted">yesterday</div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="row">
                              <div className="col-auto">
                                <span
                                  className="avatar"
                                  style={{
                                    backgroundImage:
                                      "url(./static/avatars/002f.jpg)",
                                  }}
                                ></span>
                              </div>
                              <div className="col">
                                <div className="text-truncate">
                                  <strong>Kellie Skingley</strong> closed a new
                                  deal on project{" "}
                                  <strong>Pen Pineapple Apple Pen</strong>.
                                </div>
                                <div className="text-muted">2 days ago</div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="row">
                              <div className="col-auto">
                                <span
                                  className="avatar"
                                  style={{
                                    backgroundImage:
                                      "url(./static/avatars/003f.jpg)",
                                  }}
                                ></span>
                              </div>
                              <div className="col">
                                <div className="text-truncate">
                                  <strong>Christabel Charlwood</strong> created
                                  a new project for <strong>Wikibox</strong>.
                                </div>
                                <div className="text-muted">4 days ago</div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="row">
                              <div className="col-auto">
                                <span className="avatar">HS</span>
                              </div>
                              <div className="col">
                                <div className="text-truncate">
                                  <strong>Haskel Shelper</strong> change status
                                  of <strong>Tabler Icons</strong> from{" "}
                                  <strong>open</strong> to{" "}
                                  <strong>closed</strong>.
                                </div>
                                <div className="text-muted">today</div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="row">
                              <div className="col-auto">
                                <span
                                  className="avatar"
                                  style={{
                                    backgroundImage:
                                      "url(./static/avatars/006m.jpg)",
                                  }}
                                ></span>
                              </div>
                              <div className="col">
                                <div className="text-truncate">
                                  <strong>Lorry Mion</strong> liked{" "}
                                  <strong>Tabler UI Kit</strong>.
                                </div>
                                <div className="text-muted">yesterday</div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="row">
                              <div className="col-auto">
                                <span
                                  className="avatar"
                                  style={{
                                    backgroundImage:
                                      "url(./static/avatars/004f.jpg)",
                                  }}
                                ></span>
                              </div>
                              <div className="col">
                                <div className="text-truncate">
                                  <strong>Leesa Beaty</strong> posted new video.
                                </div>
                                <div className="text-muted">2 days ago</div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="row">
                              <div className="col-auto">
                                <span
                                  className="avatar"
                                  style={{
                                    backgroundImage:
                                      "url(./static/avatars/007m.jpg)",
                                  }}
                                ></span>
                              </div>
                              <div className="col">
                                <div className="text-truncate">
                                  <strong>Perren Keemar</strong> and 3 others
                                  followed you.
                                </div>
                                <div className="text-muted">2 days ago</div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="row">
                              <div className="col-auto">
                                <span className="avatar">SA</span>
                              </div>
                              <div className="col">
                                <div className="text-truncate">
                                  <strong>Sunny Airey</strong> upload 3 new
                                  photos to category{" "}
                                  <strong>Inspirations</strong>.
                                </div>
                                <div className="text-muted">2 days ago</div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="row">
                              <div className="col-auto">
                                <span
                                  className="avatar"
                                  style={{
                                    backgroundImage:
                                      "url(./static/avatars/009m.jpg)",
                                  }}
                                ></span>
                              </div>
                              <div className="col">
                                <div className="text-truncate">
                                  <strong>Geoffry Flaunders</strong> made a{" "}
                                  <strong>$10</strong> donation.
                                </div>
                                <div className="text-muted">2 days ago</div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="row">
                              <div className="col-auto">
                                <span
                                  className="avatar"
                                  style={{
                                    backgroundImage:
                                      "url(./static/avatars/010m.jpg)",
                                  }}
                                ></span>
                              </div>
                              <div className="col">
                                <div className="text-truncate">
                                  <strong>Thatcher Keel</strong> created a
                                  profile.
                                </div>
                                <div className="text-muted">3 days ago</div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="row">
                              <div className="col-auto">
                                <span
                                  className="avatar"
                                  style={{
                                    backgroundImage:
                                      "url(./static/avatars/005f.jpg)",
                                  }}
                                ></span>
                              </div>
                              <div className="col">
                                <div className="text-truncate">
                                  <strong>Dyann Escala</strong> hosted the event{" "}
                                  <strong>Tabler UI Birthday</strong>.
                                </div>
                                <div className="text-muted">4 days ago</div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="row">
                              <div className="col-auto">
                                <span
                                  className="avatar"
                                  style={{
                                    backgroundImage:
                                      "url(./static/avatars/006f.jpg)",
                                  }}
                                ></span>
                              </div>
                              <div className="col">
                                <div className="text-truncate">
                                  <strong>Avivah Mugleston</strong> mentioned
                                  you on <strong>Best of 2020</strong>.
                                </div>
                                <div className="text-muted">2 days ago</div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="row">
                              <div className="col-auto">
                                <span className="avatar">AA</span>
                              </div>
                              <div className="col">
                                <div className="text-truncate">
                                  <strong>Arlie Armstead</strong> sent a Review
                                  Request to <strong>Amanda Blake</strong>.
                                </div>
                                <div className="text-muted">2 days ago</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
