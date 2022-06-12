import { useContext, useState, useEffect } from "react";
import { Alert, Col, Container, Image, Row, Toast } from "react-bootstrap";
import { home, avatar } from "../assets";
import {
  CardMusic,
  Login,
  MainNavbar,
  MainNavbarAdmin,
  Register,
} from "../components";
// import musicList from "../seeders/musicList";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "../assets/css/custom.css";
import { useNavigate } from "react-router-dom";
//baru
import { useQuery } from "react-query";
import { UserContext } from "../context/userContext";
import { useMutation } from "react-query";
import { API } from "../config/api";

export default function Home() {
  document.title = "Home";
  // Modal Confirm delete data
  //    const [confirmDelete, setConfirmDelete] = useState(null);
  const [state, dispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null);
  const [trans, setTrans] = useState(false);
  const navigate = useNavigate();




  // const [stateLog] = useContext(UserContext);
  useEffect(() => {
    const checkAuth =  () => {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      
      // setTrans(transaction)
      if (state.isLogin === true) {
        navigate("/");
      }
     
      
    };
    checkAuth();
  }, []);
  const [show, setShow] = useState({
    login: false,
    register: false,
  });

  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });
  // memberi nilai var dengan string jgn diberi space (email:"") jgn seperti (email:" ")
  const [formRegister, setFormRegister] = useState({
    email: "",
    password: "",
    fullname: "",
    gender: "",
    phone: "",
    address: "",
  });

  const [song, setSong] = useState({
    id: 0,
    title: "",
    artist: "",
    year: "",
    image: "",
    filesong: "",
  });

  //usemutation nanti
  const handleSubmitLogin = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(formLogin);

      // Insert data user to database
      const response = await API.post("/login", body, config);
      console.log(response.data.data);

      if (response.data.status === "success") {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });

        setFormLogin({
          email: "",
          password: "",
        });
      }

      if (response.data.data.status === "admin") {
        navigate("/transaction");
      } else {
        navigate("/");
        setShow({ login: false });
      }

      // setMessage("login success");
      // setShow({ register: false });
      setShow({ register: false });
      // Handling response here
      
    } catch (error) {
      console.log(error);
    }

    // navigate("/payment");
    // setShow({ login: false });
  });

  const handleChangeLogin = (e) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
    console.log(formLogin);
  };

  const handleSubmitRegister = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(formRegister);

      // Insert data user to database
      const response = await API.post("/register", body, config);

      console.log(response);

      if (response.data.status === "success") {
        const alert = (
          <Alert variant="success" className="py-1">
            Register Success
          </Alert>
        );
        setMessage(alert);
        setFormRegister({
          email: "",
          password: "",
          fullname: "",
          gender: "",
          phone: "",
          address: "",
        });
        setTimeout(setShow({ register: false }), 5000);
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed
          </Alert>
        );
        setMessage(alert);
      }
      // Handling response here
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
    //
  });

  const handleChangeRegister = (e) => {
    setFormRegister({
      ...formRegister,
      [e.target.name]: e.target.value,
    });
    console.log(formRegister);
  };

  let { data: musics } = useQuery("musicsCache", async () => {
    const response = await API.get("/musics");
    return response.data.data;
  });
  console.log(musics);
  return (
    //styling home beranda & login register card
    <div className="vh-100">
      {state?.user?.status === "admin" ? (
        <MainNavbarAdmin
          profile={state?.user?.fullname?.slice(0, 1).toUpperCase()}
          title={state.user.fullname}
        />
      ) : (
        <MainNavbar
          isLogin={state.isLogin}
          profile={state?.user?.fullname?.slice(0, 1).toUpperCase()}
          title={state.user.fullname}
          // handleHome={()=>navigate('/')}
          handleLogin={() => setShow({ login: true })}
          handleRegister={() => setShow({ register: true })}
        />
      )}

      <div
        className="position-absolute text-center text-light w-50"
        style={{ top: "35%", left: "25%" }}
      >
        <h1 className="mb-3">Connect on DumbSound</h1>
        <p className="fs-5">
          Discovery, Stream and share a constantly expanding mix of music from
          emerging and major artists around the world
        </p>
      </div>
      <Image
        className="img-fluid"
        src={home}
        style={{
          width: "100%",
          height: "100vh",
          objectFit: "cover",
        }}
      />
      <Container className="vh-100">
        <h4 className="text-center text-danger fw-bold my-4">
          Dengarkan Dan Rasakan
        </h4>

        <Row>
          {musics?.length !== 0 ? (
            <>
              {musics?.map((item, index) => (
                <Col key={index} lg={2} md={3} sm={6} xs={6}>
                  <CardMusic
                    // item={item}
                    image={item.song}
                    title={item.title}
                    artist={item?.artist?.name}
                    year={item.year}
                    handleSong={() => {
                      setSong({
                        id: 0,
                        title: item.title,
                        artist: item?.artist?.name,
                        year: item.year,
                        image: item.song,
                        filesong: item.filesong,
                      });
                    }}
                  />
                </Col>
              ))}
            </>
          ) : (
            <div className="mt-3 text-light fw-bold fs-4 text-center">
              No Song
            </div>
          )}
        </Row>
        {/* <ReactJkMusicPlayer audioLists={audioList} autoPlay={false}/> */}
      </Container>
      {state.isLogin ? (
        <>
          <AudioPlayer
            autoPlay
            layout="stacked-reverse"
            className="fixed-bottom bg-dark text-light"
            src={song.filesong}
            customControlsSection={[
              <div
                className="gap-3 text-md-start d-md-flex d-sm-flex-inline mb-2 me-4"
                style={{ flex: 1 }}
              >
                <div>
                  <img
                    src={song.image || avatar}
                    alt={song.image}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="text-break">
                  <div className=" fw-bold">{song.title}</div>
                  <div className="mb-2">{song.artist}</div>
                  <div style={{ fontSize: 12 }}>{song.year}</div>
                </div>
              </div>,
              RHAP_UI.MAIN_CONTROLS,
              RHAP_UI.VOLUME_CONTROLS,
            ]}
          />
        </>
      ) : (
        <></>
      )}

      <Login
        show={show.login}
        handleClose={() => setShow({ login: false })}
        handleHere={() => setShow({ register: true })}
        // ganti dengan ini nanti submit={handleSubmit.mutate(e)}
        submit={handleSubmitLogin}
        handleOnChange={handleChangeLogin}
        email={formLogin.email}
        password={formLogin.password}
      />

      <Register
        message={message && message}
        show={show.register}
        handleClose={() => setShow({ register: false })}
        handleHere={() => setShow({ login: true })}
        // ganti dengan ini nanti submit={handleSubmit.mutate(e)}
        submit={handleSubmitRegister}
        handleOnChange={handleChangeRegister}
        email={formRegister.email}
        password={formRegister.password}
        fullname={formRegister.fullname}
        gender={formRegister.gender}
        phone={formRegister.phone}
        address={formRegister.address}
      />
    </div>
  );
}
