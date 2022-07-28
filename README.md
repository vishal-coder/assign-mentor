# API Documentation

### following documents gives information about all API request and response with sample data and methods used

1.  <mark>Create Mentor </mark>

    1. `POST` - https://localhost:3000/createMentor
    2. sample request
       ```
       {"name":"Mentor1","mentor_id":"Mentor1_id"}
       ```
    3. Sample Response
       ```
           {
           "acknowledged": true,
           "insertedId": "62d16c0e8a992f3d142c34eb"
           }
       ```

2.  <mark>Create Student</mark>

    1. `POST` - https://localhost:3000/createStudent
    2. Sample request

       ```
           {"name":"Student_name","student_id":"student1_id"}
       ```

       3.Sample response

       ```
          {
              "acknowledged": true,
              "insertedId": "62d16dba8a992f3d142c34ee"
          }
       ```

3.  <mark>Assign students to Mentor</mark>

    1. `GET` - https://localhost:3000/assignStudenToMentor
    1. Sample request

    ```
    {"mentor_id":"Mentor3_id","student_id":["student1_id","student2_id","student3_id"]}
    ```

    1. Sample Response

    ```
        {
            "acknowledged": true,
            "modifiedCount": 0,
            "upsertedId": "62e22092a120f3fef22ad9e8",
            "upsertedCount": 1,
            "matchedCount": 0
        }
    ```

4.  <mark>Update mentor of single student </mark>

    1. `GET` - https://localhost:3000/updateStudent
    2. Sample Request

    ```
    {"student_id":"student5_id","mentor_id":"Mentor2_id"}
    ```

    1. Sample response

    ```
       {
    "acknowledged": true,
    "modifiedCount": 0,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 0
        }
    ```

5.  <mark>Student without mentor</mark>

    1.  `GET` - https://localhost:3000/studentWithoutMentor
    2.  No Request Parameter

    3.  Sample response

        ```
          [
            {
                "name": "student7",
                "student_id": "student7_id"
            }
          ]
        ```

6.  <mark>Mentor without Student</mark>

    1.  `GET` - https://localhost:3000/mentorWithoutStudent
    2.  No Request Parameter

    3.  Sample response

        ```
          [
            {
                "name": "Mentor1",
                "mentor_id": "Mentor1_id"
            }
          ]
        ```

7.  <mark>Student List by Mentor</mark>

    1.  `GET` - https://localhost:3000/getStudentListByMentor
    2.  Request Parameter

    ```
     {"mentor_id": "Mentor3_id"}
    ```

    4.  Sample response

        ```
         {
        "mentor_id": "Mentor3_id",
        "student_list": [
            "student4_id",
            "student1_id",
            "student2_id",
            "student3_id",
            "student1_id",
            "student2_id",
            "student3_id"
            ]
        }
        ```
