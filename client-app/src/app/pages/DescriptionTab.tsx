import { Button, Icon, Label } from "semantic-ui-react";

export default function Description() {
  return (
    <div>

      <h3>28. Find the Index of the First Occurrence in a String</h3>
      <div style={{display: "flex", flexDirection: "row"}}>
        <div style={{color: 'green', paddingTop: "6px", fontWeight: "bold"}}>
            EASY
        </div>
        <div style={{marginLeft: "10px"}}>
      <Button as="div" labelPosition="right">
        <Button color="red" size="mini">
          <Icon name="heart" />
          Like
        </Button>
        <Label as="a" basic color="red" pointing="left">
          2,048
        </Label>
      </Button>
      </div>
      <div style={{marginLeft: "10px", paddingTop: "6px"}}>
      <Button size="large" labelPosition="right" style={{paddingLeft: "10px"}}>
          <Icon name="star outline" />
      </Button>
      </div>
      </div>
      <p>
        {" "}
        Given two strings needle and haystack, return the index of the first
        occurrence of needle in haystack, or -1 if needle is not part of
        haystack.
      </p>
      <br />
      <strong>Example 1:</strong>
      <br />
      <strong>Input:</strong> haystack = "sadbutsad", needle = "sad"
      <br />
      <strong>Output: </strong>0
      <br />
      <strong>Explanation: </strong>"sad" occurs at index 0 and 6. The first
      occurrence is at index 0, so we return 0.
      <br />
      <br />
      <strong>Example 2:</strong>
      <br />
      <strong>Input: </strong>haystack = "leetcode", needle = "leeto"
      <br />
      <strong>Output: </strong>-1
      <br />
      <br />
      <strong>Explanation: </strong>"leeto" did not occur in "leetcode", so we
      return -1.
      <br />
      <br />
      <strong>Constraints:</strong>
      <br />
      <p>
        {" "}
        1 &lt;= haystack.length, needle.length &lt;= 104 haystack and needle
        consist of only lowercase English characters.
      </p>
    </div>
  );
}
