DELIMITER //

CREATE TRIGGER check_username
BEFORE INSERT ON User
FOR EACH ROW
BEGIN
  DECLARE user_exists INT;

  SELECT 1 INTO user_exists
  FROM User
  WHERE user_name = NEW.user_name
  LIMIT 1;

  IF user_exists IS NOT NULL THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Username taken. Please choose a different username.';
  END IF;
END;

DELIMITER ;