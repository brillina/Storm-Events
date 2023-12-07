DROP PROCEDURE IF EXISTS weather_status;
DELIMITER //

CREATE PROCEDURE calculate_tornado_stats()
BEGIN
  DECLARE done INT DEFAULT FALSE;
  DECLARE cur_wind_speed INT;
  DECLARE cur_tornado_size DECIMAL(10,2);
  DECLARE total_wind_speed INT DEFAULT 0;
  DECLARE total_tornado_size DECIMAL(10,2) DEFAULT 0.00;
  DECLARE count_events INT DEFAULT 0;
  DECLARE avg_wind_speed DECIMAL(10,2);
  DECLARE avg_tornado_size DECIMAL(10,2);

  DECLARE tornado_cursor CURSOR FOR 
    SELECT wind_speed, tornado_size
    FROM Tornado;

  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done := TRUE;

  OPEN tornado_cursor;
  tornado_loop: LOOP
    FETCH tornado_cursor INTO cur_wind_speed, cur_tornado_size;
    IF done THEN
      LEAVE tornado_loop;
    END IF;
    SET total_wind_speed = total_wind_speed + cur_wind_speed;
    SET total_tornado_size = total_tornado_size + cur_tornado_size;
    SET count_events = count_events + 1;
  END LOOP;
  CLOSE tornado_cursor;

  IF count_events > 0 THEN
    SET avg_wind_speed = total_wind_speed / count_events;
    SET avg_tornado_size = total_tornado_size / count_events;
  ELSE
    SET avg_wind_speed = 0;
    SET avg_tornado_size = 0;
  END IF;

  -- Return Results
  SELECT 'Average Wind Speed' AS Statistic, avg_wind_speed AS Value;
  SELECT 'Average Tornado Size' AS Statistic, avg_tornado_size AS Value;
END;

DELIMITER ;