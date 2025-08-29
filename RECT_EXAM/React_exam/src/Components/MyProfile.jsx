import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Mail, Calendar, User as UserIcon } from "lucide-react"; // icons

// format helper -> "29 Aug 2025"
const formatDate = (val) => {
  if (!val) return null;
  const d = new Date(val);
  if (isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getInitial = (nameOrEmail) =>
  nameOrEmail ? nameOrEmail.trim().charAt(0).toUpperCase() : "U";

const MyProfile = () => {
  // Safe selector (supports different reducer keys)
  const auth = useSelector((s) => s?.authReducer ?? s?.auth ?? s?.userReducer ?? {});
  const user = auth?.user ?? null;

  // derived profile
  const profile = useMemo(() => {
    if (!user) return {};
    const name = user.name || user.fullName || "User";
    const email = user.email || "—";
    const photo = user.photo || user.avatar || "";
    // try common date keys
    const joinedRaw = user.createdAt || user.joinedAt || user.created_on || user.created || null;
    const joinedPretty = formatDate(joinedRaw);
    return {
      name,
      email,
      role: user.role || "Member",
      photo,
      joinedPretty,
      initial: getInitial(user.name || user.fullName || user.email),
    };
  }, [user]);

  return (
    <div className="auth-page">
      <Container className="px-0" style={{ maxWidth: 920 }}>
        <Card className="profile-card shadow-sm border-0">
          <Card.Body className="p-4 p-md-5">
            {/* Header row */}
            <Row className="align-items-center g-4">
              <Col md="auto" className="text-center">
              
              </Col>

              <Col>
                <h2 className="mb-1">{profile.name}</h2>
                <div className="d-flex flex-wrap gap-2">
                  <Badge bg="success" className="soft-badge">{profile.role}</Badge>

                  {/* Joined date badge only if we have a valid date */}
                  {profile.joinedPretty && (
                    <Badge bg="info" className="soft-badge d-inline-flex align-items-center">
                      <Calendar size={14} className="me-1" />
                      Joined: {profile.joinedPretty}
                    </Badge>
                  )}
                </div>
              </Col>

              <Col md="auto" className="text-md-end">
                <Link to="/students" className="button-header me-2">
                  <UserIcon size={16} className="me-1" />
                  My Students
                </Link>
                <Link to="/profile/edit" className="account-btn">Edit Profile</Link>
              </Col>
            </Row>

            <hr className="my-4" />

            {/* Details */}
            <Row className="gy-3">
              <Col md={6}>
                <div className="profile-field">
                  <span className="field-label">
                    <Mail size={16} className="me-2" /> Email :
                  </span>
                  <span className="ps-1 field-value">{profile.email}</span>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default MyProfile;
