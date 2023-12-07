-- Active: 1701897268072@@34.41.207.129@3306@cs411
CREATE PROCEDURE `weather_status`(
  IN p_category_name VARCHAR(255),
  IN p_attribute VARCHAR(255),
  IN p_order_direction VARCHAR(4)
)
BEGIN
  DECLARE done INT DEFAULT FALSE;
  DECLARE stat_value DECIMAL;
  DECLARE median_value DECIMAL;
  DECLARE mode_value DECIMAL;
  DECLARE stat_cursor CURSOR FOR
    SELECT
      CASE
        WHEN p_attribute = 'deaths' THEN deathsDirect + deathsIndirect
        WHEN p_attribute = 'injuries' THEN injuriesDirect + injuriesIndirect
        WHEN p_attribute = 'property_damage' THEN IFNULL(CAST(damageProperty AS DECIMAL), 0)
        WHEN p_attribute = 'crop_damage' THEN IFNULL(CAST(damageCrops AS DECIMAL), 0)
        ELSE 0
      END AS value_stat
    FROM WeatherEvent we
    INNER JOIN Category c ON we.category_id = c.Category_id
    WHERE c.category_name = p_category_name;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
  CREATE TEMPORARY TABLE tempStats (
    Value DECIMAL
  );

  OPEN stat_cursor;
  stat_loop: LOOP
    FETCH stat_cursor INTO stat_value;
    IF done THEN
      LEAVE stat_loop;
    END IF;
    INSERT INTO tempStats (Value) VALUES (stat_value);
  END LOOP;
  CLOSE stat_cursor;

  -- Calculate Median
  SET @rowindex := -1;
  SELECT
    AVG(d.value)
  INTO median_value
  FROM (
    SELECT @rowindex:=@rowindex + 1 AS 'rowindex', tempStats.value AS 'value'
    FROM tempStats
    ORDER BY tempStats.value
  ) AS d
  WHERE 
    d.rowindex IN (FLOOR(@rowindex / 2), CEIL(@rowindex / 2));

  -- Calculate Mode
  SELECT Value INTO mode_value FROM (
    SELECT Value, COUNT(*) AS freq
    FROM tempStats
    GROUP BY Value
    ORDER BY freq DESC, Value DESC
    LIMIT 1
  ) AS subquery;

  -- Return Results
  SELECT 'Average' AS Statistic, AVG(Value) AS Value FROM tempStats;
  SELECT 'Mean' AS Statistic, AVG(Value) AS Value FROM tempStats;
  SELECT 'Median' AS Statistic, median_value AS Value;
  SELECT 'Mode' AS Statistic, mode_value AS Value;

  -- Optional: To view all the values in tempStats
  -- SELECT * FROM tempStats ORDER BY Value;

  DROP TEMPORARY TABLE IF EXISTS tempStats;
END;